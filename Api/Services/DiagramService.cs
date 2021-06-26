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
        private readonly Dictionary<string, Diagram> _loadedDiagrams;

        public DiagramService(IDiagramLoader diagramLoader)
        {
            _diagramLoader = diagramLoader;
            _loadedDiagrams = new Dictionary<string, Diagram>();
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
            if (_loadedDiagrams.ContainsKey(diagramId))
            {
                return _loadedDiagrams[diagramId];
            }
            else
            {
                var diagram = _diagramLoader.LoadDiagramById(diagramId);
                _loadedDiagrams.Add(diagramId, diagram);
                return diagram;
            }
        }

        public bool SaveDiagram(Diagram diagram)
        {
            if (_loadedDiagrams.ContainsKey(diagram.Id))
            {
                _loadedDiagrams[diagram.Id] = diagram;
                return true;
            }
            else
            {
                return false;
            }
        }
    }
}
