using System.Text.Json.Serialization;
using LiveDiagram.Api.Model;

namespace LiveDiagram.Api.Contracts.Data
{
    public interface IDiagramItemAddData
    {
        [JsonPropertyName("item")]
        DiagramItem Item { get; set; }

        [JsonPropertyName("parentRelation")]
        Relation ParentRelation { get; set; }
    }
}
