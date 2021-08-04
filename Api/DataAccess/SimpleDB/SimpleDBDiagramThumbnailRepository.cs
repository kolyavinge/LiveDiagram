using System.Collections.Generic;
using System.Linq;
using LiveDiagram.Api.Contracts.Common;
using SimpleDB;

namespace LiveDiagram.Api.DataAccess.SimpleDB
{
    public class SimpleDBDiagramThumbnailRepository : IDiagramThumbnailRepository
    {
        public IDBEngine Engine { get; internal set; }

        public List<DiagramThumbnail> Get(IEnumerable<AvailableDiagram> diagrams)
        {
            var diagramIds = diagrams.Select(x => x.Id).ToList();
            return Engine.GetCollection<DiagramThumbnail>().Query()
                .Select()
                .Where(x => diagramIds.Contains(x.DiagramId))
                .ToList();
        }

        public void Save(DiagramThumbnail thumbnail)
        {
            Engine.GetCollection<DiagramThumbnail>().InsertOrUpdate(thumbnail);
        }
    }
}
