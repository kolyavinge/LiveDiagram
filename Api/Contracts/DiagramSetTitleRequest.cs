using System.Text.Json.Serialization;

namespace LiveDiagram.Api.Contracts
{
    public class DiagramSetTitleRequest : Request
    {
        [JsonPropertyName("diagramId")]
        public string DiagramId { get; set; }

        [JsonPropertyName("diagramTitle")]
        public string DiagramTitle { get; set; }
    }
}
