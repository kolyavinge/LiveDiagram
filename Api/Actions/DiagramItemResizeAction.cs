using System.Text.Json.Serialization;
using LiveDiagram.Api.Contracts.Data;

namespace LiveDiagram.Api.Actions
{
    public class DiagramItemResizeAction : LiveDiagram.Api.Common.Action, IDiagramItemResizeData
    {
        [JsonPropertyName("itemId")]
        public string DiagramItemId { get; set; }

        [JsonPropertyName("itemX")]
        public float DiagramItemX { get; set; }

        [JsonPropertyName("itemY")]
        public float DiagramItemY { get; set; }

        [JsonPropertyName("itemWidth")]
        public float DiagramItemWidth { get; set; }

        [JsonPropertyName("itemHeight")]
        public float DiagramItemHeight { get; set; }

        public DiagramItemResizeAction(string actionId, IDiagramItemResizeData data) : base(actionId)
        {
            DiagramItemId = data.DiagramItemId;
            DiagramItemX = data.DiagramItemX;
            DiagramItemY = data.DiagramItemY;
            DiagramItemWidth = data.DiagramItemWidth;
            DiagramItemHeight = data.DiagramItemHeight;
        }
    }
}
