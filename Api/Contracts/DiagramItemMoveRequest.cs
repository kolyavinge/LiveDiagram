using System.Text.Json.Serialization;

namespace LiveDiagram.Api.Contracts
{
    public class DiagramItemMoveRequest : Request
    {
        [JsonPropertyName("itemId")]
        public string DiagramItemId { get; set; }

        [JsonPropertyName("itemX")]
        public float DiagramItemX { get; set; }

        [JsonPropertyName("itemY")]
        public float DiagramItemY { get; set; }
    }
}
