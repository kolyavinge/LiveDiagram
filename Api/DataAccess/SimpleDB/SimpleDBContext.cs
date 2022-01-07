using System;
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
            var isNewDatabase = !File.Exists(databaseFilePath);

            var builder = DBEngineBuilder.Make();
            builder.DatabaseFilePath(databaseFilePath);

            builder.Map<Diagram>()
                .PrimaryKey(x => x.Id)
                .Field(0, x => x.Title)
                .Field(1, x => x.Items, new FieldSettings { Compressed = true })
                .Field(2, x => x.Relations, new FieldSettings { Compressed = true })
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
                .PrimaryKey(x => x.DiagramId)
                .Field(0, x => x.Content, new FieldSettings { Compressed = true })
                .MakeFunction(() => new DiagramThumbnail())
                .PrimaryKeySetFunction((primaryKeyValue, entity) => entity.DiagramId = (string)primaryKeyValue)
                .FieldSetFunction((fieldNumber, fieldValue, entity) =>
                {
                    if (fieldNumber == 0) entity.Content = (string)fieldValue;
                });

            builder.Map<DiagramMeta>()
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

            builder.Index<DiagramMeta>()
               .Name("title")
               .For(x => x.Title);

            builder.Index<DiagramMeta>()
                .Name("titleLetter")
                .For(x => x.TitleLetter);

            builder.Index<DiagramMeta>()
                .Name("titleNumber")
                .For(x => x.TitleNumber);

            builder.Index<DiagramMeta>()
                .Name("createDate")
                .For(x => x.CreateDate);

            builder.Index<DiagramMeta>()
                .Name("updateDate")
                .For(x => x.UpdateDate);

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
