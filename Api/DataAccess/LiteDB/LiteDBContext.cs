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
                int count = 10000;
                databaseFile.GetCollection<Diagram>().Insert(generator.GetDefaultDiagram(count).ToList());
                databaseFile.GetCollection<DiagramThumbnail>().Insert(generator.GetDefaultDiagramThumbnail(count).ToList());
                databaseFile.GetCollection<DiagramMeta>().Insert(generator.GetDefaultDiagramMeta(count).ToList());
                databaseFile.GetCollection<Diagram>().Insert(generator.GetBigDiagram100());
                databaseFile.GetCollection<DiagramMeta>().Insert(generator.GetBigDiagram100Meta());
            }
            RepositoryFactory = new LiteDBRepositoryFactory(databaseFile);
        }

        private void CreateMappings(LiteDatabase databaseFile)
        {
            databaseFile.Mapper.Entity<Diagram>().Id(x => x.Id);
            databaseFile.Mapper.Entity<DiagramThumbnail>().Id(x => x.DiagramId);
            databaseFile.Mapper.Entity<DiagramMeta>().Id(x => x.DiagramId);
        }

        public void Dispose() { }

        public IRepositoryFactory RepositoryFactory { get; private set; }
    }
}
