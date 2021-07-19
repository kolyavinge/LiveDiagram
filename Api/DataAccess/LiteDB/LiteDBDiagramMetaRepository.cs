using System;
using System.Collections.Generic;
using System.Linq;
using LiteDB;
using LiveDiagram.Api.Contracts.Common;
using LiveDiagram.Api.Model;
using LiveDiagram.Api.Utils;

namespace LiveDiagram.Api.DataAccess.LiteDB
{
    class LiteDBDiagramMetaRepository : IDiagramMetaRepository
    {
        public LiteDatabase DatabaseFile { get; set; }

        public DiagramMeta GetDiagramMeta(Diagram diagram)
        {
            return DatabaseFile.GetCollection<DiagramMeta>().Query()
                .Where(x => x.DiagramId == diagram.Id)
                .FirstOrDefault();
        }

        public IEnumerable<DiagramMeta> GetDiagramMeta(IEnumerable<AvailableDiagram> diagrams)
        {
            var diagramsId = diagrams.Select(x => x.Id).ToList();
            return DatabaseFile.GetCollection<DiagramMeta>().Query()
                .Where(x => diagramsId.Contains(x.DiagramId))
                .ToList();
        }

        public int GetDiagramMetaCount(DiagramMetaCountFilter filter)
        {
            var query = DatabaseFile.GetCollection<DiagramMeta>().Query();
            if (!String.IsNullOrWhiteSpace(filter.FilterTitle))
            {
                query = query.Where(x => x.Title.Contains(filter.FilterTitle));
            }

            return query.Count();
        }

        public IEnumerable<DiagramMeta> GetDiagramMeta(DiagramMetaFilter filter)
        {
            var query = DatabaseFile.GetCollection<DiagramMeta>().Query();

            var direction = filter.Direction == SortDirection.Asc ? 1 : 2;
            if (filter.Sort == DiagramSortField.Title)
            {
                query = query.OrderBy(x => new { x.TitleLetter, x.TitleNumber }, direction);
            }
            else if (filter.Sort == DiagramSortField.CreateDate)
            {
                query = query.OrderBy(x => x.CreateDate, direction);
            }
            else if (filter.Sort == DiagramSortField.UpdateDate)
            {
                query = query.OrderBy(x => x.UpdateDate, direction);
            }

            if (!String.IsNullOrWhiteSpace(filter.FilterTitle))
            {
                query = query.Where(x => x.Title.Contains(filter.FilterTitle));
            }

            var result = filter.Batch != null ? query.Skip(filter.Batch.StartIndex).Limit(filter.Batch.Count).ToList() : query.ToList();

            return result;
        }

        public void SaveMeta(DiagramMeta meta)
        {
            DatabaseFile.GetCollection<DiagramMeta>().Upsert(meta);
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
