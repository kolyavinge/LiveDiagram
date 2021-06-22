using System.Text.Json.Serialization;

namespace LiveDiagram.Api.Contracts.Data
{
    public interface IDiagramItemMoveData
    {
        [JsonPropertyName("itemId")]
        string DiagramItemId { get; set; }

        [JsonPropertyName("itemX")]
        float DiagramItemX { get; set; }

        [JsonPropertyName("itemY")]
        float DiagramItemY { get; set; }
    }
}
