using System.Text.Json.Serialization;

namespace LiveDiagram.Api.Contracts
{
    public class Request
    {
        [JsonPropertyName("clientId")]
        public string ClientId { get; set; }
    }
}
