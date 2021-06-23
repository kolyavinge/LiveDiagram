using System.Text.Json.Serialization;
using LiveDiagram.Api.Contracts.Data;

namespace LiveDiagram.Api.Actions
{
    public class DiagramItemMoveAction : LiveDiagram.Api.Common.Action, IDiagramItemMoveData
    {
        [JsonPropertyName("itemId")]
        public string DiagramItemId { get; set; }

        [JsonPropertyName("itemX")]
        public float DiagramItemX { get; set; }

        [JsonPropertyName("itemY")]
        public float DiagramItemY { get; set; }

        public DiagramItemMoveAction(string actionId, IDiagramItemMoveData data) : base(actionId)
        {
            DiagramItemId = data.DiagramItemId;
            DiagramItemX = data.DiagramItemX;
            DiagramItemY = data.DiagramItemY;
        }
    }
}
