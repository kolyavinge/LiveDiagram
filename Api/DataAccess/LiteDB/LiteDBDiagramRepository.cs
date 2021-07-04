using System.Collections.Generic;
using System.Linq;
using LiveDiagram.Api.Contracts.Common;
using LiveDiagram.Api.Model;

namespace LiveDiagram.Api.DataAccess.LiteDB
{
    class LiteDBDiagramRepository : IDiagramRepository
    {
        public DatabaseFile DatabaseFile { get; set; }

        public IEnumerable<AvailableDiagram> GetAvailableDiagrams()
        {
            using (var db = DatabaseFile.Open())
            {
                return db.GetCollection<Diagram>().Query()
                    .Select(x => new { x.Id, x.Title })
                    .ToList()
                    .Select(x => new AvailableDiagram { Id = x.Id, Title = x.Title });
            }
        }

        public Diagram GetById(string diagramId)
        {
            using (var db = DatabaseFile.Open())
            {
                return db.GetCollection<Diagram>().Query()
                    .Where(x => x.Id == diagramId)
                    .FirstOrDefault();
            }
        }

        public void SaveDiagram(Diagram diagram)
        {
            using (var db = DatabaseFile.Open())
            {
                db.GetCollection<Diagram>().Upsert(diagram);
            }
        }
    }
}
