using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace LiveDiagram.Api.Contracts.Data
{
    public interface IDiagramItemResizeData
    {
        [JsonPropertyName("items")]
        IEnumerable<DiagramItemResizePosition> Items { get; set; }
    }

    public class DiagramItemResizePosition
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
