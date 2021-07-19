using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;
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
            var filter = new DiagramMetaCountFilter
            {
                FilterTitle = param.FilterTitle
            };
            var count = _dbContext.RepositoryFactory.Get<IDiagramMetaRepository>().GetDiagramMetaCount(filter);

            return count;
        }

        public List<AvailableDiagram> GetAvailableDiagrams(GetAvailableDiagramsParams param)
        {
            var filter = new DiagramMetaFilter
            {
                FilterTitle = param.FilterTitle,
                Sort = param.Sort,
                Direction = param.Direction,
                Batch = param.Batch
            };
            var meta = _dbContext.RepositoryFactory.Get<IDiagramMetaRepository>().GetDiagramMeta(filter);
            var availableDiagrams = meta.Select(x => new AvailableDiagram { Id = x.DiagramId, Title = x.Title }).ToList();
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

            var updateDate = DateTime.UtcNow;
            var diagramMetaRepo = _dbContext.RepositoryFactory.Get<IDiagramMetaRepository>();
            var meta = diagramMetaRepo.GetDiagramMeta(diagram) ?? new DiagramMeta { DiagramId = diagram.Id, CreateDate = updateDate };
            meta.Title = diagram.Title;
            var titleRegex = new Regex(@"^(.*)\s(\d+)?$");
            var titleRegexMatch = titleRegex.Match(diagram.Title);
            meta.TitleLetter = titleRegexMatch.Success ? titleRegexMatch.Groups[1].Value : diagram.Title;
            meta.TitleNumber = titleRegexMatch.Success ? int.Parse(titleRegexMatch.Groups[2].Value) : 0;
            meta.UpdateDate = updateDate;
            diagramMetaRepo.SaveMeta(meta);

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

        public DiagramSortField Sort { get; set; }

        public SortDirection Direction { get; set; }

        public Batch Batch { get; set; }
    }
}
