using System.Collections.Generic;
using System.IO;
using LiteDB;
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
                databaseFile.GetCollection<Diagram>().Insert(GetDefaultDiagram());
            }
            RepositoryFactory = new LiteDBRepositoryFactory(databaseFile);
        }

        private void CreateMappings(LiteDatabase databaseFile)
        {
            databaseFile.Mapper.Entity<Diagram>().Id(x => x.Id);
            databaseFile.Mapper.Entity<DiagramThumbnail>().Id(x => x.DiagramId);
        }

        public IRepositoryFactory RepositoryFactory { get; private set; }

        private Diagram GetDefaultDiagram()
        {
            return new Diagram
            {
                Id = "12345",
                Title = "Тестовая диаграмма",
                Items = new List<DiagramItem>
                {
                    new DiagramItem
                    {
                        Id = "1",
                        Title = "Object",
                        X = 900,
                        Y = 10,
                        Width = 200,
                        Height = 100
                    },
                    new DiagramItem
                    {
                        Id = "10",
                        Title = "Collection",
                        X = 300,
                        Y = 250,
                        Width = 100,
                        Height = 100
                    },
                    new DiagramItem
                    {
                        Id = "100",
                        Title = "Array",
                        X = 10,
                        Y = 450,
                        Width = 200,
                        Height = 100
                    },
                    new DiagramItem
                    {
                        Id = "101",
                        Title = "List",
                        X = 250,
                        Y = 450,
                        Width = 200,
                        Height = 100
                    },
                    new DiagramItem
                    {
                        Id = "102",
                        Title = "HashSet",
                        X = 500,
                        Y = 450,
                        Width = 200,
                        Height = 100
                    },
                    new DiagramItem
                    {
                        Id = "11",
                        Title = "FrameworkElement",
                        X = 900,
                        Y = 250,
                        Width = 200,
                        Height = 100
                    },
                    new DiagramItem
                    {
                        Id = "110",
                        Title = "Component",
                        X = 900,
                        Y = 450,
                        Width = 200,
                        Height = 100
                    },
                    new DiagramItem
                    {
                        Id = "1100",
                        Title = "DataGrid",
                        X = 900,
                        Y = 650,
                        Width = 200,
                        Height = 100
                    },
                    new DiagramItem
                    {
                        Id = "12",
                        Title = "Regex",
                        X = 1200,
                        Y = 200,
                        Width = 200,
                        Height = 100
                    },
                },
                Relations = new List<Relation>
                {
                    new Relation
                    {
                        Id = "1+10",
                        DiagramItemIdFrom = "1",
                        DiagramItemIdTo = "10"
                    },
                    new Relation
                    {
                        Id = "10+100",
                        DiagramItemIdFrom = "10",
                        DiagramItemIdTo = "100"
                    },
                    new Relation
                    {
                        Id = "10+101",
                        DiagramItemIdFrom = "10",
                        DiagramItemIdTo = "101"
                    },
                    new Relation
                    {
                        Id = "10+102",
                        DiagramItemIdFrom = "10",
                        DiagramItemIdTo = "102"
                    },
                    new Relation
                    {
                        Id = "1+11",
                        DiagramItemIdFrom = "1",
                        DiagramItemIdTo = "11"
                    },
                    new Relation
                    {
                        Id = "11+110",
                        DiagramItemIdFrom = "11",
                        DiagramItemIdTo = "110"
                    },
                    new Relation
                    {
                        Id = "110+1100",
                        DiagramItemIdFrom = "110",
                        DiagramItemIdTo = "1100"
                    },
                    new Relation
                    {
                        Id = "1+12",
                        DiagramItemIdFrom = "1",
                        DiagramItemIdTo = "12"
                    }
                }
            };
        }
    }
}
