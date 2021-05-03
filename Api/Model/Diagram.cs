using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace LiveDiagram.Api.Model
{
    public class Diagram
    {
        [JsonPropertyName("id")]
        public string Id { get; set; }

        [JsonPropertyName("items")]
        public List<DiagramItem> Items { get; set; }
    }
}
