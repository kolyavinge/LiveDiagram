using System.Text.Json.Serialization;

namespace LiveDiagram.Api.Contracts.Common
{
    public class DiagramThumbnail
    {
        [JsonPropertyName("diagramId")]
        public string DiagramId { get; set; }

        [JsonPropertyName("content")]
        public string Content { get; set; }
    }
}
