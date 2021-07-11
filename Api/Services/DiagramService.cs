using System;
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
        int GetAvailableDiagramsCount();
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

        public int GetAvailableDiagramsCount()
        {
            var diagramRepo = _dbContext.RepositoryFactory.Get<IDiagramRepository>();
            var diagramsFromDB = diagramRepo.GetAvailableDiagrams();

            return _loadedDiagrams
                .Select(diagram => new AvailableDiagram { Id = diagram.Id, Title = diagram.Title })
                .Union(diagramsFromDB)
                .Count();
        }

        public List<AvailableDiagram> GetAvailableDiagrams(GetAvailableDiagramsParams param)
        {
            var diagramRepo = _dbContext.RepositoryFactory.Get<IDiagramRepository>();
            var diagramsFromDB = diagramRepo.GetAvailableDiagrams();
            var availableDiagrams = _loadedDiagrams
                .Select(diagram => new AvailableDiagram { Id = diagram.Id, Title = diagram.Title })
                .Union(diagramsFromDB)
                .OrderBy(x => x.Title, new StringLogicalComparer())
                .ToList();
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

            return true;
        }

        public void SetTitle(Diagram diagram, string title)
        {
            diagram.Title = title;
        }
    }

    public class GetAvailableDiagramsParams
    {
        public bool IncludeThumbnails { get; set; }

        public Batch Batch { get; set; }
    }
}
