﻿using System.Text.Json.Serialization;

namespace LiveDiagram.Api.Contracts
{
    public class DiagramItemResizeRequest : Request
    {
        [JsonPropertyName("diagramId")]
        public string DiagramId { get; set; }

        [JsonPropertyName("itemId")]
        public string DiagramItemId { get; set; }

        [JsonPropertyName("itemX")]
        public int DiagramItemX { get; set; }

        [JsonPropertyName("itemY")]
        public int DiagramItemY { get; set; }

        [JsonPropertyName("itemWidth")]
        public int DiagramItemWidth { get; set; }

        [JsonPropertyName("itemHeight")]
        public int DiagramItemHeight { get; set; }
    }
}
