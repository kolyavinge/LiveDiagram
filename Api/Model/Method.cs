using System.Text.Json.Serialization;

namespace LiveDiagram.Api.Model
{
    public class Method
    {
        [JsonPropertyName("id")]
        public string Id { get; set; }

        [JsonPropertyName("signature")]
        public string Signature { get; set; }
    }
}
