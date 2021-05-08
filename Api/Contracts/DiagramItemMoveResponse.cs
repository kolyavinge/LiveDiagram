using System.Text.Json.Serialization;

namespace LiveDiagram.Api.Contracts
{
    public class DiagramItemMoveResponse : DiagramResponse
    {
        [JsonPropertyName("itemId")]
        public string DiagramItemId { get; set; }

        [JsonPropertyName("itemX")]
        public int DiagramItemX { get; set; }

        [JsonPropertyName("itemY")]
        public int DiagramItemY { get; set; }
    }
}
