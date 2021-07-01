using System.Collections.Generic;
using System.Linq;
using LiveDiagram.Api.Common;
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
        private readonly IDiagramLoader _diagramLoader;
        private readonly DiagramsCollection _createdDiagrams;
        private readonly DiagramsCollection _loadedDiagrams;

        public DiagramService(IDiagramLoader diagramLoader)
        {
            _diagramLoader = diagramLoader;
            _createdDiagrams = new DiagramsCollection();
            _loadedDiagrams = new DiagramsCollection();
        }

        public List<AvailableDiagram> GetAvailableDiagrams()
        {
            var diagramsFromDB = new List<AvailableDiagram>
            {
                new AvailableDiagram { Id = "12345", Title = "Новая диаграмма" },
                new AvailableDiagram { Id = "6789", Title = "Еще одна новая диаграмма" },
            };

            return _loadedDiagrams.Select(diagram => new AvailableDiagram { Id = diagram.Id, Title = diagram.Title }).Union(diagramsFromDB).ToList();
        }

        public Diagram GetDiagramById(string diagramId)
        {
            var diagram = _createdDiagrams.GetDiagramByIdOrNull(diagramId) ?? _loadedDiagrams.GetDiagramByIdOrNull(diagramId);
            if (diagram == null)
            {
                diagram = _diagramLoader.LoadDiagramById(diagramId);
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
            return true;
        }

        public void SetTitle(Diagram diagram, string title)
        {
            diagram.Title = title;
        }
    }
}
