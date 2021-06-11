using System.Text.Json.Serialization;

namespace LiveDiagram.Api.Contracts
{
    public class DiagramSetTitleRequest : Request
    {
        [JsonPropertyName("diagramTitle")]
        public string DiagramTitle { get; set; }
    }
}
