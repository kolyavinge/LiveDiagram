using System.Collections.Generic;
using System.Linq;
using LiveDiagram.Api.Contracts.Common;

namespace LiveDiagram.Api.DataAccess.LiteDB
{
    class LiteDBDiagramThumbnailRepository : IDiagramThumbnailRepository
    {
        public DatabaseFile DatabaseFile { get; set; }

        public List<DiagramThumbnail> Get(IEnumerable<AvailableDiagram> diagrams)
        {
            var diagramIdList = diagrams.Select(x => x.Id).ToList();
            using (var db = DatabaseFile.Open())
            {
                return db.GetCollection<DiagramThumbnail>().Query()
                    .Where(x => diagramIdList.Contains(x.DiagramId))
                    .ToList();
            }
        }

        public void Save(DiagramThumbnail thumbnail)
        {
            using (var db = DatabaseFile.Open())
            {
                db.GetCollection<DiagramThumbnail>().Upsert(thumbnail);
            }
        }
    }
}
