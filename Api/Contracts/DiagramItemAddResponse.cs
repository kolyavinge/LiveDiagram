using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace LiveDiagram.Api.Contracts
{
    public class DiagramItemAddResponse : DiagramItemResponse
    {
        [JsonPropertyName("itemTitle")]
        public string DiagramItemTitle { get; set; }

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
