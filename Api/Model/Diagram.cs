using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace LiveDiagram.Api.Model
{
    public class Diagram
    {
        [JsonPropertyName("id")]
        public string Id { get; set; }

        [JsonPropertyName("title")]
        public string Title { get; set; }

        [JsonPropertyName("width")]
        public float Width { get; set; }

        [JsonPropertyName("height")]
        public float Height { get; set; }

        [JsonPropertyName("items")]
        public List<DiagramItem> Items { get; set; }

        [JsonPropertyName("relations")]
        public List<Relation> Relations { get; set; }
    }
}
