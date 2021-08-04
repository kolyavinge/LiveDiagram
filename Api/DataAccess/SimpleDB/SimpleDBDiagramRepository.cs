using LiveDiagram.Api.Model;
using SimpleDB;

namespace LiveDiagram.Api.DataAccess.SimpleDB
{
    public class SimpleDBDiagramRepository : IDiagramRepository
    {
        public IDBEngine Engine { get; internal set; }

        public Diagram GetById(string diagramId)
        {
            return Engine.GetCollection<Diagram>().Get(diagramId);
        }

        public void SaveDiagram(Diagram diagram)
        {
            Engine.GetCollection<Diagram>().InsertOrUpdate(diagram);
        }
    }
}
