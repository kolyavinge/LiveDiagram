using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace LiveDiagram.Api.Contracts
{
    public class DiagramItemDeleteRequest : Request
    {
        [JsonPropertyName("diagramId")]
        public string DiagramId { get; set; }

        [JsonPropertyName("itemsId")]
        public IEnumerable<string> DiagramItemsId { get; set; }
    }
}
