using System.Text.Json.Serialization;

namespace LiveDiagram.Api.Contracts
{
    public class DiagramSetTitleResponse : DiagramResponse
    {
        [JsonPropertyName("diagramTitle")]
        public string DiagramTitle { get; set; }
    }
}
