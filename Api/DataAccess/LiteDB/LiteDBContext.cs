using System.Collections.Generic;
using System.IO;
using System.Linq;
using LiteDB;
using LiveDiagram.Api.Common;
using LiveDiagram.Api.Contracts.Common;
using LiveDiagram.Api.Model;
using Microsoft.Extensions.Configuration;

namespace LiveDiagram.Api.DataAccess.LiteDB
{
    public class LiteDBContext : IDBContext
    {
        public LiteDBContext(IConfiguration configuration)
        {
            var databaseFilePath = configuration["DatabaseFilePath"];
            bool databaseFileExists = File.Exists(databaseFilePath);
            var databaseFile = new LiteDatabase(databaseFilePath);
            CreateMappings(databaseFile);
            if (!databaseFileExists)
            {
                var generator = new DiagramGenerator();
                databaseFile.GetCollection<Diagram>().Insert(generator.GetDefaultDiagram(10000).ToList());
                databaseFile.GetCollection<DiagramThumbnail>().Insert(generator.GetDefaultDiagramThumbnail(10000).ToList());
                databaseFile.GetCollection<DiagramMeta>().Insert(generator.GetDefaultDiagramMeta(10000).ToList());
            }
            RepositoryFactory = new LiteDBRepositoryFactory(databaseFile);
        }

        private void CreateMappings(LiteDatabase databaseFile)
        {
            databaseFile.Mapper.Entity<Diagram>().Id(x => x.Id);
            databaseFile.Mapper.Entity<DiagramThumbnail>().Id(x => x.DiagramId);
            databaseFile.Mapper.Entity<DiagramMeta>().Id(x => x.DiagramId);
        }

        public IRepositoryFactory RepositoryFactory { get; private set; }
    }
}
