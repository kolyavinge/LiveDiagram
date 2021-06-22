using System.Collections.Generic;
using System.Text.Json.Serialization;
using LiveDiagram.Api.Model;

namespace LiveDiagram.Api.Contracts.Data
{
    public interface IDiagramItemEditData
    {
        [JsonPropertyName("itemId")]
        string DiagramItemId { get; set; }

        [JsonPropertyName("itemTitle")]
        string DiagramItemTitle { get; set; }

        [JsonPropertyName("parentHasChanged")]
        bool ParentHasChanged { get; set; }

        [JsonPropertyName("parentRelation")]
        Relation ParentRelation { get; set; }

        [JsonPropertyName("methods")]
        IEnumerable<Method> Methods { get; set; }
    }
}
