using System.Collections.Generic;
using System.Linq;
using LiteDB;
using LiveDiagram.Api.Model;

namespace LiveDiagram.Api.DataAccess.LiteDB
{
    public class LiteDBDiagramRepository : IDiagramRepository
    {
        private string _databaseFilePath;

        public LiteDBDiagramRepository(string databaseFilePath)
        {
            _databaseFilePath = databaseFilePath;
        }

        public IEnumerable<AvailableDiagram> GetAvailableDiagrams()
        {
            using (var db = new LiteDatabase(_databaseFilePath))
            {
                return db.GetCollection<Diagram>().Query()
                    .Select(x => new { x.Id, x.Title })
                    .ToList()
                    .Select(x => new AvailableDiagram { Id = x.Id, Title = x.Title });
            }
        }

        public Diagram GetById(string diagramId)
        {
            using (var db = new LiteDatabase(_databaseFilePath))
            {
                return db.GetCollection<Diagram>().Query()
                    .Where(x => x.Id == diagramId)
                    .FirstOrDefault();
            }
        }

        public void SaveDiagram(Diagram diagram)
        {
            using (var db = new LiteDatabase(_databaseFilePath))
            {
                db.GetCollection<Diagram>().Upsert(diagram);
            }
        }
    }
}
