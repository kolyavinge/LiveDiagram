using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LiveDiagram.Api.DataAccess
{
    public interface IRepositoryFactory
    {
        TRepository Get<TRepository>() where TRepository : IRepository;
    }
}
