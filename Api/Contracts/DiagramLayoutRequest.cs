using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace LiveDiagram.Api.Contracts
{
    public class DiagramLayoutRequest : Request
    {
        [JsonPropertyName("diagramId")]
        public string DiagramId { get; set; }

        [JsonPropertyName("items")]
        public IEnumerable<DiagramLayoutRequestItem> Items { get; set; }
    }

    public class DiagramLayoutRequestItem
    {
        [JsonPropertyName("id")]
        public string Id { get; set; }

        [JsonPropertyName("x")]
        public float X { get; set; }

        [JsonPropertyName("y")]
        public float Y { get; set; }

        [JsonPropertyName("width")]
        public float Width { get; set; }

        [JsonPropertyName("height")]
        public float Height { get; set; }
    }
}
