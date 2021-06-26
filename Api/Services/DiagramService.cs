using System.Collections.Generic;
using LiveDiagram.Api.Common;
using LiveDiagram.Api.Model;

namespace LiveDiagram.Api.Services
{
    public interface IDiagramService
    {
        List<AvailableDiagram> GetAvailableDiagrams();
        Diagram GetDiagramById(string diagramId);
        bool SaveDiagram(Diagram diagram);
    }

    public class DiagramService : IDiagramService
    {
        private readonly IDiagramLoader _diagramLoader;
        private readonly LoadedDiagramsCollection _loadedDiagrams;

        public DiagramService(IDiagramLoader diagramLoader)
        {
            _diagramLoader = diagramLoader;
            _loadedDiagrams = new LoadedDiagramsCollection();
        }

        public List<AvailableDiagram> GetAvailableDiagrams()
        {
            return new List<AvailableDiagram>
            {
                new AvailableDiagram { Id = "12345", Title = "Новая диаграмма" },
                new AvailableDiagram { Id = "6789", Title = "Еще одна новая диаграмма" },
            };
        }

        public Diagram GetDiagramById(string diagramId)
        {
            var diagram = _loadedDiagrams.GetDiagramByIdOrNull(diagramId);
            if (diagram == null)
            {
                diagram = _diagramLoader.LoadDiagramById(diagramId);
                _loadedDiagrams.Add(diagram);
            }

            return diagram;
        }

        public bool SaveDiagram(Diagram diagram)
        {
            _loadedDiagrams.Set(diagram);
            return true;
        }
    }
}
