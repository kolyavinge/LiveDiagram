using System.Collections.Generic;
using LiveDiagram.Api.Contracts.Common;
using LiveDiagram.Api.Model;

namespace LiveDiagram.Api.Common
{
    public class DiagramGenerator
    {
        public IEnumerable<Diagram> GetDefaultDiagram(int count)
        {
            for (int i = 1; i <= count; i++)
            {
                var diagram = GetDefaultDiagram(i.ToString());
                diagram.Title += " " + i.ToString();
                yield return diagram;
            }
        }

        public Diagram GetDefaultDiagram(string diagramId)
        {
            return new Diagram
            {
                Id = diagramId,
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

        public IEnumerable<DiagramThumbnail> GetDefaultDiagramThumbnail(int count)
        {
            for (int i = 1; i <= count; i++)
            {
                var thumb = GetDefaultDiagramThumbnail(i.ToString());
                yield return thumb;
            }
        }

        public DiagramThumbnail GetDefaultDiagramThumbnail(string diagramId)
        {
            return new DiagramThumbnail
            {
                DiagramId = diagramId,
                Content = "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"
            };
        }
    }
}
