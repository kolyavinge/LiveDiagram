using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LiveDiagram.Api.DataAccess
{
    public interface IDBContext
    {
        IRepositoryFactory RepositoryFactory { get; }
    }
}
