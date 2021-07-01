using System.Collections.Generic;
using System.Linq;
using LiveDiagram.Api.Common;
using LiveDiagram.Api.DataAccess;
using LiveDiagram.Api.Model;

namespace LiveDiagram.Api.Services
{
    public interface IDiagramService
    {
        List<AvailableDiagram> GetAvailableDiagrams();
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

        public List<AvailableDiagram> GetAvailableDiagrams()
        {
            var diagramRepo = _dbContext.RepositoryFactory.Get<IDiagramRepository>();
            var diagramsFromDB = diagramRepo.GetAvailableDiagrams();

            return _loadedDiagrams.Select(diagram => new AvailableDiagram { Id = diagram.Id, Title = diagram.Title }).Union(diagramsFromDB).ToList();
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

            return true;
        }

        public void SetTitle(Diagram diagram, string title)
        {
            diagram.Title = title;
        }
    }
}
