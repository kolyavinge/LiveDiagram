using System.Text.Json.Serialization;

namespace LiveDiagram.Api.Contracts.Common
{
    public class Batch
    {
        [JsonPropertyName("startIndex")]
        public int StartIndex { get; set; }

        [JsonPropertyName("count")]
        public int Count { get; set; }
    }
}
