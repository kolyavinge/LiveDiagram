using System.Text.Json.Serialization;

namespace LiveDiagram.Api.Contracts
{
    public class DiagramItemResizeResponse : Response
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
    }
}
