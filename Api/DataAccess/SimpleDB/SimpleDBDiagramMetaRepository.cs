using System;
using System.Collections.Generic;
using LiveDiagram.Api.Contracts.Common;
using LiveDiagram.Api.Model;
using SimpleDB;

namespace LiveDiagram.Api.DataAccess.SimpleDB
{
    public class SimpleDBDiagramMetaRepository : IDiagramMetaRepository
    {
        public IDBEngine Engine { get; internal set; }

        public DiagramMeta GetDiagramMeta(Diagram diagram)
        {
            return Engine.GetCollection<DiagramMeta>().Get(diagram.Id);
        }

        public IEnumerable<DiagramMeta> GetDiagramMeta(DiagramMetaFilter filter)
        {
            var query = Engine.GetCollection<DiagramMeta>().Query()
                .Select();

            var direction = filter.Direction == Utils.SortDirection.Asc ? SortDirection.Asc : SortDirection.Desc;
            if (filter.Sort == DiagramSortField.Title)
            {
                query = query
                    .OrderBy(x => x.TitleLetter, direction)
                    .OrderBy(x => x.TitleNumber, direction);
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

        public int GetDiagramMetaCount(DiagramMetaCountFilter filter)
        {
            if (!String.IsNullOrWhiteSpace(filter.FilterTitle))
            {
                return Engine.GetCollection<DiagramMeta>().Query()
                    .Where(x => x.Title.Contains(filter.FilterTitle))
                    .Count();
            }
            else
            {
                return Engine.GetCollection<DiagramMeta>().Count();
            }
        }

        public void SaveMeta(DiagramMeta meta)
        {
            Engine.GetCollection<DiagramMeta>().InsertOrUpdate(meta);
        }
    }
}
