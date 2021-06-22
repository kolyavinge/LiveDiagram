using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace LiveDiagram.Api.Contracts.Data
{
    public interface IDiagramItemDeleteData
    {
        [JsonPropertyName("itemsId")]
        IEnumerable<string> DiagramItemsId { get; set; }

        [JsonPropertyName("relationsId")]
        IEnumerable<string> RelationsId { get; set; }
    }
}
