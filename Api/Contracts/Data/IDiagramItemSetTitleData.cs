using System.Text.Json.Serialization;

namespace LiveDiagram.Api.Contracts.Data
{
    public interface IDiagramItemSetTitleData
    {
        [JsonPropertyName("itemId")]
        string DiagramItemId { get; set; }

        [JsonPropertyName("itemTitle")]
        string DiagramItemTitle { get; set; }
    }
}
