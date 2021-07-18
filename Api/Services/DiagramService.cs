﻿using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using LiveDiagram.Api.Common;
using LiveDiagram.Api.Contracts.Common;
using LiveDiagram.Api.DataAccess;
using LiveDiagram.Api.Model;
using LiveDiagram.Api.Utils;

namespace LiveDiagram.Api.Services
{
    public interface IDiagramService
    {
        int GetAvailableDiagramsCount(GetAvailableDiagramsCountParams param);
        List<AvailableDiagram> GetAvailableDiagrams(GetAvailableDiagramsParams param);
        Diagram GetDiagramById(string diagramId);
        void CreateDiagram(string diagramId);
        bool SaveDiagram(Diagram diagram);
        void SetTitle(Diagram diagram, string title);
    }

    public class DiagramService : IDiagramService
    {
        private readonly IDBContext _dbContext;
        private readonly DiagramsCollection _createdDiagrams;
        private readonly DiagramsCollection _loadedDiagrams;

        public DiagramService(IDBContext dbContext)
        {
            _dbContext = dbContext;
            _createdDiagrams = new DiagramsCollection();
            _loadedDiagrams = new DiagramsCollection();
        }

        public int GetAvailableDiagramsCount(GetAvailableDiagramsCountParams param)
        {
            var diagramRepo = _dbContext.RepositoryFactory.Get<IDiagramRepository>();
            IEnumerable<AvailableDiagram> diagramsFromDB = null;
            if (String.IsNullOrWhiteSpace(param.FilterTitle))
            {
                diagramsFromDB = diagramRepo.GetAvailableDiagrams();
            }
            else
            {
                diagramsFromDB = diagramRepo.GetAvailableDiagrams(x => x.Title.Contains(param.FilterTitle));
            }
            var loadedDiagramsAvailableDiagrams = _loadedDiagrams.Select(diagram => new AvailableDiagram { Id = diagram.Id, Title = diagram.Title });
            if (!String.IsNullOrWhiteSpace(param.FilterTitle))
            {
                loadedDiagramsAvailableDiagrams = loadedDiagramsAvailableDiagrams.Where(x => x.Title.Contains(param.FilterTitle));
            }

            return loadedDiagramsAvailableDiagrams
                .Union(diagramsFromDB)
                .Count();
        }

        public List<AvailableDiagram> GetAvailableDiagrams(GetAvailableDiagramsParams param)
        {
            var diagramRepo = _dbContext.RepositoryFactory.Get<IDiagramRepository>();
            var diagramsFromDB = String.IsNullOrWhiteSpace(param.FilterTitle)
                ? diagramRepo.GetAvailableDiagrams()
                : diagramRepo.GetAvailableDiagrams(x => x.Title.Contains(param.FilterTitle));
            var loadedDiagramsAvailableDiagrams = _loadedDiagrams.Select(diagram => new AvailableDiagram { Id = diagram.Id, Title = diagram.Title });
            if (!String.IsNullOrWhiteSpace(param.FilterTitle))
            {
                loadedDiagramsAvailableDiagrams = loadedDiagramsAvailableDiagrams.Where(x => x.Title.Contains(param.FilterTitle));
            }
            var availableDiagrams = loadedDiagramsAvailableDiagrams.Union(diagramsFromDB).ToList();
            if (param.Sort == DiagramSort.Title)
            {
                availableDiagrams = availableDiagrams.OrderBy(x => x.Title, new StringLogicalComparer(param.Direction)).ToList();
            }
            else
            {
                var withMeta = (from a in availableDiagrams
                                join m in _dbContext.RepositoryFactory.Get<IDiagramMetaRepository>().GetDiagramMeta(availableDiagrams)
                                on a.Id equals m.DiagramId
                                select new { AvailableDiagram = a, Meta = m }).ToList();
                if (param.Sort == DiagramSort.CreateDate)
                {
                    availableDiagrams = withMeta.OrderBy(x => x.Meta.CreateDate, new DateTimeComparer(param.Direction)).Select(x => x.AvailableDiagram).ToList();
                }
                else if (param.Sort == DiagramSort.UpdateDate)
                {
                    availableDiagrams = withMeta.OrderBy(x => x.Meta.UpdateDate, new DateTimeComparer(param.Direction)).Select(x => x.AvailableDiagram).ToList();
                }
            }
            if (param.Batch != null)
            {
                if (availableDiagrams.Count > param.Batch.StartIndex)
                {
                    availableDiagrams.RemoveRange(0, param.Batch.StartIndex);
                }
                if (availableDiagrams.Count > param.Batch.Count)
                {
                    availableDiagrams.RemoveRange(param.Batch.Count, availableDiagrams.Count - param.Batch.Count);
                }
            }
            if (param.IncludeThumbnails)
            {
                var diagramThumbnailRepo = _dbContext.RepositoryFactory.Get<IDiagramThumbnailRepository>();
                var thumbnails = diagramThumbnailRepo.Get(availableDiagrams).ToDictionary(k => k.DiagramId, v => v.Content);
                foreach (var availableDiagram in availableDiagrams)
                {
                    if (thumbnails.ContainsKey(availableDiagram.Id))
                    {
                        availableDiagram.Thumbnail = "data:image/jpg;base64," + thumbnails[availableDiagram.Id];
                    }
                }
            }

            return availableDiagrams;
        }

        public Diagram GetDiagramById(string diagramId)
        {
            var diagram = _createdDiagrams.GetDiagramByIdOrNull(diagramId) ?? _loadedDiagrams.GetDiagramByIdOrNull(diagramId);
            if (diagram == null)
            {
                var diagramRepo = _dbContext.RepositoryFactory.Get<IDiagramRepository>();
                diagram = diagramRepo.GetById(diagramId);
                _loadedDiagrams.Add(diagram);
            }

            return diagram;
        }

        public void CreateDiagram(string diagramId)
        {
            _createdDiagrams.Add(new Diagram { Id = diagramId });
        }

        public bool SaveDiagram(Diagram diagram)
        {
            _loadedDiagrams.Set(diagram);
            _createdDiagrams.Delete(diagram.Id);
            var diagramRepo = _dbContext.RepositoryFactory.Get<IDiagramRepository>();
            diagramRepo.SaveDiagram(diagram);

            var painter = new DiagramPainter();
            var diagramImage = painter.CreateImage(diagram);
            var diagramImageStream = new MemoryStream();
            diagramImage.Save(diagramImageStream, System.Drawing.Imaging.ImageFormat.Jpeg);
            var diagramImageContent = Convert.ToBase64String(diagramImageStream.ToArray());
            var diagramThumbnailRepo = _dbContext.RepositoryFactory.Get<IDiagramThumbnailRepository>();
            var diagramThumbnail = new DiagramThumbnail { DiagramId = diagram.Id, Content = diagramImageContent };
            diagramThumbnailRepo.Save(diagramThumbnail);

            _dbContext.RepositoryFactory.Get<IDiagramMetaRepository>().SaveUpdateDate(diagram, DateTime.UtcNow);

            return true;
        }

        public void SetTitle(Diagram diagram, string title)
        {
            diagram.Title = title;
        }
    }

    public class GetAvailableDiagramsCountParams
    {
        public string FilterTitle { get; set; }
    }

    public class GetAvailableDiagramsParams
    {
        public bool IncludeThumbnails { get; set; }

        public string FilterTitle { get; set; }

        public DiagramSort Sort { get; set; }

        public SortDirection Direction { get; set; }

        public Batch Batch { get; set; }
    }

    public enum DiagramSort { Title, CreateDate, UpdateDate }
}
