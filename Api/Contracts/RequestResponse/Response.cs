using System.Text.Json.Serialization;

namespace LiveDiagram.Api.Contracts.RequestResponse
{
    public class Response
    {
        [JsonPropertyName("success")]
        public bool Success { get; set; }

        [JsonPropertyName("clientId")]
        public string ClientId { get; set; }

        [JsonPropertyName("actionId")]
        public string ActionId { get; set; }

        [JsonPropertyName("diagramId")]
        public string DiagramId { get; set; }
    }
}
