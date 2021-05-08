using System.Text.Json.Serialization;

namespace LiveDiagram.Api.Contracts
{
    public class GetDiagramByIdRequest : Request
    {
        [JsonPropertyName("diagramId")]
        public string DiagramId { get; set; }
    }
}
