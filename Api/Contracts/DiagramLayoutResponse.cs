using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace LiveDiagram.Api.Contracts
{
    public class DiagramLayoutResponse : Response
    {
        [JsonPropertyName("items")]
        public IEnumerable<DiagramLayoutRequestItem> Items { get; set; }
    }
}
