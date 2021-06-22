using System.Text.Json.Serialization;

namespace LiveDiagram.Api.Contracts.RequestResponse
{
    public class Request
    {
        [JsonPropertyName("clientId")]
        public string ClientId { get; set; }

        [JsonPropertyName("actionId")]
        public string ActionId { get; set; }

        [JsonPropertyName("diagramId")]
        public string DiagramId { get; set; }
    }
}
