using System.Text.Json.Serialization;

namespace LiveDiagram.Api.Contracts.Data
{
    public interface IDiagramItemResizeData
    {
        [JsonPropertyName("itemId")]
        string DiagramItemId { get; set; }

        [JsonPropertyName("itemX")]
        float DiagramItemX { get; set; }

        [JsonPropertyName("itemY")]
        float DiagramItemY { get; set; }

        [JsonPropertyName("itemWidth")]
        float DiagramItemWidth { get; set; }

        [JsonPropertyName("itemHeight")]
        float DiagramItemHeight { get; set; }
    }
}
