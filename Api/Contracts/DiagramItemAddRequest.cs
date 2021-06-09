using System.Collections.Generic;
using System.Text.Json.Serialization;
using LiveDiagram.Api.Model;

namespace LiveDiagram.Api.Contracts
{
    public class DiagramItemAddRequest : Request
    {
        [JsonPropertyName("actionId")]
        public string ActionId { get; set; }

        [JsonPropertyName("diagramId")]
        public string DiagramId { get; set; }

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

        [JsonPropertyName("methods")]
        public IEnumerable<Method> Methods { get; set; }
    }
}
