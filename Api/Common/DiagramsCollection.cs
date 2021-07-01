using System.Collections;
using System.Collections.Concurrent;
using System.Collections.Generic;
using LiveDiagram.Api.Model;

namespace LiveDiagram.Api.Common
{
    public class DiagramsCollection : IEnumerable<Diagram>
    {
        private readonly ConcurrentDictionary<string, Diagram> _diagrams;

        public DiagramsCollection()
        {
            _diagrams = new ConcurrentDictionary<string, Diagram>();
        }

        public Diagram GetDiagramByIdOrNull(string diagramId)
        {
            Diagram diagram;
            if (_diagrams.TryGetValue(diagramId, out diagram))
            {
                return diagram;
            }
            else
            {
                return null;
            }
        }

        public void Add(Diagram diagram)
        {
            _diagrams.TryAdd(diagram.Id, diagram);
        }

        public void Set(Diagram diagram)
        {
            Diagram removed;
            _diagrams.TryRemove(diagram.Id, out removed);
            _diagrams.TryAdd(diagram.Id, diagram);
        }

        public void Delete(string diagramId)
        {
            Diagram removed;
            _diagrams.TryRemove(diagramId, out removed);
        }

        public IEnumerator<Diagram> GetEnumerator()
        {
            return _diagrams.Values.GetEnumerator();
        }

        IEnumerator IEnumerable.GetEnumerator()
        {
            return GetEnumerator();
        }
    }
}
