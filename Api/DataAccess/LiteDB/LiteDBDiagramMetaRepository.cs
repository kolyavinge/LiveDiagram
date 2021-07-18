using System;
using System.Collections.Generic;
using System.Linq;
using LiteDB;
using LiveDiagram.Api.Contracts.Common;
using LiveDiagram.Api.Model;

namespace LiveDiagram.Api.DataAccess.LiteDB
{
    class LiteDBDiagramMetaRepository : IDiagramMetaRepository
    {
        public LiteDatabase DatabaseFile { get; set; }

        public IEnumerable<DiagramMeta> GetDiagramMeta(IEnumerable<AvailableDiagram> diagrams)
        {
            var diagramsId = diagrams.Select(x => x.Id).ToList();
            return DatabaseFile.GetCollection<DiagramMeta>().Query()
                .Where(x => diagramsId.Contains(x.DiagramId))
                .ToList();
        }

        public void SaveUpdateDate(Diagram diagram, DateTime updateDate)
        {
            var meta = DatabaseFile.GetCollection<DiagramMeta>().Query()
                .Where(x => x.DiagramId == diagram.Id)
                .FirstOrDefault() ?? new DiagramMeta { DiagramId = diagram.Id, CreateDate = updateDate };

            meta.UpdateDate = updateDate;

            DatabaseFile.GetCollection<DiagramMeta>().Upsert(meta);
        }
    }
}
