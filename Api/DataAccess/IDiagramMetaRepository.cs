using System;
using System.Collections.Generic;
using LiveDiagram.Api.Contracts.Common;
using LiveDiagram.Api.Model;
using LiveDiagram.Api.Utils;

namespace LiveDiagram.Api.DataAccess
{
    public interface IDiagramMetaRepository : IRepository
    {
        DiagramMeta GetDiagramMeta(Diagram diagram);

        int GetDiagramMetaCount(DiagramMetaCountFilter filter);

        IEnumerable<DiagramMeta> GetDiagramMeta(DiagramMetaFilter filter);

        void SaveMeta(DiagramMeta meta);
    }

    public class DiagramMetaCountFilter
    {
        public string FilterTitle { get; set; }
    }

    public class DiagramMetaFilter
    {
        public string FilterTitle { get; set; }

        public DiagramSortField Sort { get; set; }

        public SortDirection Direction { get; set; }

        public Batch Batch { get; set; }
    }
}
