using System;
using System.Collections.Generic;
using LiveDiagram.Api.Contracts.Common;
using LiveDiagram.Api.Model;

namespace LiveDiagram.Api.DataAccess
{
    public interface IDiagramMetaRepository : IRepository
    {
        IEnumerable<DiagramMeta> GetDiagramMeta(IEnumerable<AvailableDiagram> diagrams);

        void SaveUpdateDate(Diagram diagram, DateTime updateDate);
    }
}
