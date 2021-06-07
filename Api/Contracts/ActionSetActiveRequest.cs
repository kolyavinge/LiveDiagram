using System.Text.Json.Serialization;

namespace LiveDiagram.Api.Contracts
{
    public class ActionSetActiveRequest : Request
    {
        [JsonPropertyName("actionId")]
        public string ActionId { get; set; }

        [JsonPropertyName("diagramId")]
        public string DiagramId { get; set; }
    }
}
