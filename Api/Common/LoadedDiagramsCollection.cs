using System.Collections;
using System.Collections.Concurrent;
using System.Collections.Generic;
using LiveDiagram.Api.Model;

namespace LiveDiagram.Api.Common
{
    public class LoadedDiagramsCollection : IEnumerable<Diagram>
    {
        private readonly ConcurrentDictionary<string, Diagram> _loadedDiagrams;

        public LoadedDiagramsCollection()
        {
            _loadedDiagrams = new ConcurrentDictionary<string, Diagram>();
        }

        public Diagram GetDiagramByIdOrNull(string diagramId)
        {
            Diagram diagram;
            if (_loadedDiagrams.TryGetValue(diagramId, out diagram))
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
            _loadedDiagrams.TryAdd(diagram.Id, diagram);
        }

        public void Set(Diagram diagram)
        {
            Diagram removed;
            _loadedDiagrams.TryRemove(diagram.Id, out removed);
            _loadedDiagrams.TryAdd(diagram.Id, diagram);
        }

        public IEnumerator<Diagram> GetEnumerator()
        {
            return _loadedDiagrams.Values.GetEnumerator();
        }

        IEnumerator IEnumerable.GetEnumerator()
        {
            return GetEnumerator();
        }
    }
}
