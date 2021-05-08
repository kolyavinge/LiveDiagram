using System.Text.Json.Serialization;

namespace LiveDiagram.Api.Contracts
{
    public class DiagramResponse : Response
    {
        [JsonPropertyName("diagramId")]
        public string DiagramId { get; set; }
    }
}
