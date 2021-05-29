using System.Text.Json.Serialization;
using LiveDiagram.Api.Model;

namespace LiveDiagram.Api.Contracts
{
    public class DiagramItemAddResponse : DiagramResponse
    {
        [JsonPropertyName("itemId")]
        public string DiagramItemId { get; set; }

        [JsonPropertyName("itemTitle")]
        public string DiagramItemTitle { get; set; }

        [JsonPropertyName("itemX")]
        public float DiagramItemX { get; set; }

        [JsonPropertyName("itemY")]
        public float DiagramItemY { get; set; }

        [JsonPropertyName("itemWidth")]
        public float DiagramItemWidth { get; set; }

        [JsonPropertyName("itemHeight")]
        public float DiagramItemHeight { get; set; }

        [JsonPropertyName("parentRelation")]
        public Relation ParentRelation { get; set; }
    }
}
