﻿using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using LiveDiagram.Api.Common;
using LiveDiagram.Api.Contracts.Common;
using LiveDiagram.Api.Model;
using Microsoft.Extensions.Configuration;
using SimpleDB;

namespace LiveDiagram.Api.DataAccess.SimpleDB
{
    public class SimpleDBContext : IDBContext
    {
        private IDBEngine _engine;

        public SimpleDBContext(IConfiguration configuration)
        {
            var databaseFilePath = configuration["DatabaseFilePath"];
            var isNewDatabase = Directory.GetFiles(databaseFilePath).Any() == false;

            var builder = DBEngineBuilder.Make();
            builder.WorkingDirectory(databaseFilePath);

            builder.Map<Diagram>()
                .Name("diagram")
                .PrimaryKey(x => x.Id)
                .Field(0, x => x.Title)
                .Field(1, x => x.Items)
                .Field(2, x => x.Relations)
                .Field(3, x => x.Width)
                .Field(4, x => x.Height)
                .MakeFunction(() => new Diagram())
                .PrimaryKeySetFunction((primaryKeyValue, entity) => entity.Id = (string)primaryKeyValue)
                .FieldSetFunction((fieldNumber, fieldValue, entity) =>
                {
                    if (fieldNumber == 0) entity.Title = (string)fieldValue;
                    if (fieldNumber == 1) entity.Items = (List<DiagramItem>)fieldValue;
                    if (fieldNumber == 2) entity.Relations = (List<Relation>)fieldValue;
                    if (fieldNumber == 3) entity.Width = (float)fieldValue;
                    if (fieldNumber == 4) entity.Height = (float)fieldValue;
                });

            builder.Map<DiagramThumbnail>()
                .Name("diagramThumbnail")
                .PrimaryKey(x => x.DiagramId)
                .Field(0, x => x.Content)
                .MakeFunction(() => new DiagramThumbnail())
                .PrimaryKeySetFunction((primaryKeyValue, entity) => entity.DiagramId = (string)primaryKeyValue)
                .FieldSetFunction((fieldNumber, fieldValue, entity) =>
                {
                    if (fieldNumber == 0) entity.Content = (string)fieldValue;
                });

            builder.Map<DiagramMeta>()
                .Name("diagramMeta")
                .PrimaryKey(x => x.DiagramId)
                .Field(0, x => x.Title)
                .Field(1, x => x.TitleLetter)
                .Field(2, x => x.TitleNumber)
                .Field(3, x => x.CreateDate)
                .Field(4, x => x.UpdateDate)
                .MakeFunction(() => new DiagramMeta())
                .PrimaryKeySetFunction((primaryKeyValue, entity) => entity.DiagramId = (string)primaryKeyValue)
                .FieldSetFunction((fieldNumber, fieldValue, entity) =>
                {
                    if (fieldNumber == 0) entity.Title = (string)fieldValue;
                    if (fieldNumber == 1) entity.TitleLetter = (string)fieldValue;
                    if (fieldNumber == 2) entity.TitleNumber = (int)fieldValue;
                    if (fieldNumber == 3) entity.CreateDate = (DateTime)fieldValue;
                    if (fieldNumber == 4) entity.UpdateDate = (DateTime)fieldValue;
                });

            _engine = builder.BuildEngine();

            if (isNewDatabase)
            {
                var generator = new DiagramGenerator();
                int count = 100000;
                _engine.GetCollection<Diagram>().Insert(generator.GetDefaultDiagram(count));
                _engine.GetCollection<DiagramThumbnail>().Insert(generator.GetDefaultDiagramThumbnail(count));
                _engine.GetCollection<DiagramMeta>().Insert(generator.GetDefaultDiagramMeta(count));
            }

            RepositoryFactory = new SimpleDBRepositoryFactory(_engine);
        }

        public IRepositoryFactory RepositoryFactory { get; private set; }
    }
}
