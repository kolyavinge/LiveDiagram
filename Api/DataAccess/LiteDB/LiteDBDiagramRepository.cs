using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using LiteDB;
using LiveDiagram.Api.Contracts.Common;
using LiveDiagram.Api.Model;

namespace LiveDiagram.Api.DataAccess.LiteDB
{
    class LiteDBDiagramRepository : IDiagramRepository
    {
        public LiteDatabase DatabaseFile { get; set; }

        public Diagram GetById(string diagramId)
        {
            return DatabaseFile.GetCollection<Diagram>().Query()
                .Where(x => x.Id == diagramId)
                .FirstOrDefault();
        }

        public void SaveDiagram(Diagram diagram)
        {
            DatabaseFile.GetCollection<Diagram>().Upsert(diagram);
        }
    }
}
