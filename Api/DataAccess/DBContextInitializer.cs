using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;

namespace LiveDiagram.Api.DataAccess
{
    public class DBContextInitializer
    {
        public IDBContext MakeDBContext(IConfiguration configuration)
        {
            var databaseContextType = configuration["DatabaseContextType"];
            var databaseContextInstance = (IDBContext)Activator.CreateInstance(Type.GetType(databaseContextType), new object[] { configuration });

            return databaseContextInstance;
        }
    }
}
