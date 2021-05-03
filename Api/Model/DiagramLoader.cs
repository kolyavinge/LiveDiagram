using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LiveDiagram.Api.Model
{
    public class DiagramLoader
    {
        public Diagram LoadDiagramById(string id)
        {
            return new Diagram
            {
                Id = "12345",
                Items = new List<DiagramItem>
                {
                    new DiagramItem
                    {
                        Id = "789",
                        Title = "Parent",
                        X = 10,
                        Y = 10,
                        Width = 100,
                        Height = 100
                    },
                    new DiagramItem
                    {
                        Id = "987",
                        Title = "Child",
                        X = 100,
                        Y = 250,
                        Width = 100,
                        Height = 100
                    },
                }
            };
        }
    }
}
