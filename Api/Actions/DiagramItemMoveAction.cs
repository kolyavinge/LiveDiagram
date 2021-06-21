using System.Text.Json.Serialization;
using LiveDiagram.Api.Model;

namespace LiveDiagram.Api.Actions
{
    public class DiagramItemMoveAction : LiveDiagram.Api.Common.Action
    {
        [JsonPropertyName("item")]
        public DiagramItem Item { get; }

        [JsonPropertyName("positionXOld")]
        public float PositionXOld { get; }

        [JsonPropertyName("positionYOld")]
        public float PositionYOld { get; }

        [JsonPropertyName("positionXNew")]
        public float PositionXNew { get; }

        [JsonPropertyName("positionYNew")]
        public float PositionYNew { get; }

        public DiagramItemMoveAction(
            string actionId,
            DiagramItem item,
            float positionXOld,
            float positionYOld,
            float positionXNew,
            float positionYNew) : base(actionId)
        {
            Item = item;
            PositionXOld = positionXOld;
            PositionYOld = positionYOld;
            PositionXNew = positionXNew;
            PositionYNew = positionYNew;
        }

        public override void Do()
        {
            Item.X = PositionXNew;
            Item.Y = PositionYNew;
        }
    }
}
