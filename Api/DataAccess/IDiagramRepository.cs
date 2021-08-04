using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using LiveDiagram.Api.Contracts.Common;
using LiveDiagram.Api.Model;
using LiveDiagram.Api.Utils;

namespace LiveDiagram.Api.DataAccess
{
    public interface IDiagramRepository : IRepository
    {
        Diagram GetById(string diagramId);

        void SaveDiagram(Diagram diagram);
    }
}
