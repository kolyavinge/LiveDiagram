using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace LiveDiagram.Api.Contracts
{
    public class DiagramLayoutResponse : DiagramResponse
    {
        [JsonPropertyName("items")]
        public IEnumerable<DiagramLayoutRequestItem> Items { get; set; }
    }
}
