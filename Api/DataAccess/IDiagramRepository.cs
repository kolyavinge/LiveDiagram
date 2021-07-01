using System.Collections.Generic;
using LiveDiagram.Api.Model;

namespace LiveDiagram.Api.DataAccess
{
    public interface IDiagramRepository : IRepository
    {
        IEnumerable<AvailableDiagram> GetAvailableDiagrams();

        Diagram GetById(string diagramId);

        void SaveDiagram(Diagram diagram);
    }
}
