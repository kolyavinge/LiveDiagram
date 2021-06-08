using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace LiveDiagram.Api.Contracts
{
    public class DiagramItemDeleteResponse : DiagramResponse
    {
        [JsonPropertyName("itemsId")]
        public IEnumerable<string> DiagramItemsId { get; set; }

        [JsonPropertyName("relationsId")]
        public IEnumerable<string> RelationsId { get; set; }
    }
}
