using System.Text.Json.Serialization;
using LiveDiagram.Api.Model;

namespace LiveDiagram.Api.Actions
{
    public class DiagramItemResizeAction : LiveDiagram.Api.Common.Action
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

        [JsonPropertyName("sizeWidthOld")]
        public float SizeWidthOld { get; }

        [JsonPropertyName("sizeHeightOld")]
        public float SizeHeightOld { get; }

        [JsonPropertyName("sizeWidthNew")]
        public float SizeWidthNew { get; }

        [JsonPropertyName("sizeHeightNew")]
        public float SizeHeightNew { get; }

        public DiagramItemResizeAction(
            string actionId,
            DiagramItem item,
            float positionXOld,
            float positionYOld,
            float positionXNew,
            float positionYNew,
            float sizeWidthOld,
            float sizeHeightOld,
            float sizeWidthNew,
            float sizeHeightNew) : base(actionId)
        {
            Item = item;
            PositionXOld = positionXOld;
            PositionYOld = positionYOld;
            PositionXNew = positionXNew;
            PositionYNew = positionYNew;
            SizeWidthOld = sizeWidthOld;
            SizeHeightOld = sizeHeightOld;
            SizeWidthNew = sizeWidthNew;
            SizeHeightNew = sizeHeightNew;
        }

        public override void Do()
        {
            Item.X = PositionXNew;
            Item.Y = PositionYNew;
            Item.Width = SizeWidthNew;
            Item.Height = SizeHeightNew;
        }
    }
}
