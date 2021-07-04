using System.Collections.Generic;
using System.Linq;
using LiteDB;
using LiveDiagram.Api.Contracts.Common;

namespace LiveDiagram.Api.DataAccess.LiteDB
{
    class LiteDBDiagramThumbnailRepository : IDiagramThumbnailRepository
    {
        public LiteDatabase DatabaseFile { get; set; }

        public List<DiagramThumbnail> Get(IEnumerable<AvailableDiagram> diagrams)
        {
            var diagramIdList = diagrams.Select(x => x.Id).ToList();
            return DatabaseFile.GetCollection<DiagramThumbnail>().Query()
                .Where(x => diagramIdList.Contains(x.DiagramId))
                .ToList();
        }

        public void Save(DiagramThumbnail thumbnail)
        {
            DatabaseFile.GetCollection<DiagramThumbnail>().Upsert(thumbnail);
        }
    }
}
