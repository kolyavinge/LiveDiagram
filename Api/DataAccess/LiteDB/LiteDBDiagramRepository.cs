using System.Collections.Generic;
using System.Linq;
using LiteDB;
using LiveDiagram.Api.Contracts.Common;
using LiveDiagram.Api.Model;

namespace LiveDiagram.Api.DataAccess.LiteDB
{
    class LiteDBDiagramRepository : IDiagramRepository
    {
        public LiteDatabase DatabaseFile { get; set; }

        public IEnumerable<AvailableDiagram> GetAvailableDiagrams()
        {
            return DatabaseFile.GetCollection<Diagram>().Query()
                .Select(x => new { x.Id, x.Title })
                .ToList()
                .Select(x => new AvailableDiagram { Id = x.Id, Title = x.Title });
        }

        public Diagram GetById(string diagramId)
        {
            return DatabaseFile.GetCollection<Diagram>().Query()
                .Where(x => x.Id == diagramId)
                .FirstOrDefault();
        }

        public void SaveDiagram(Diagram diagram)
        {
            DatabaseFile.GetCollection<Diagram>().Upsert(diagram);
        }
    }
}
