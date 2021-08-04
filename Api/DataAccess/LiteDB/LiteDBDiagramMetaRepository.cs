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

            if (filter.Sort == DiagramSortField.Title && filter.Direction == SortDirection.Asc)
            {
                query = query.OrderBy(x => new { x.TitleLetter, x.TitleNumber });
            }
            else if (filter.Sort == DiagramSortField.Title && filter.Direction == SortDirection.Desc)
            {
                query = query.OrderByDescending(x => new { x.TitleLetter, x.TitleNumber });
            }
            else if (filter.Sort == DiagramSortField.CreateDate && filter.Direction == SortDirection.Asc)
            {
                query = query.OrderBy(x => x.CreateDate);
            }
            else if (filter.Sort == DiagramSortField.CreateDate && filter.Direction == SortDirection.Desc)
            {
                query = query.OrderByDescending(x => x.CreateDate);
            }
            else if (filter.Sort == DiagramSortField.UpdateDate && filter.Direction == SortDirection.Asc)
            {
                query = query.OrderBy(x => x.UpdateDate);
            }
            else if (filter.Sort == DiagramSortField.UpdateDate && filter.Direction == SortDirection.Desc)
            {
                query = query.OrderByDescending(x => x.UpdateDate);
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
    }
}
