using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace LiveDiagram.Api.Contracts
{
    public class DiagramItemMoveResponse : DiagramItemResponse
    {
        [JsonPropertyName("itemX")]
        public int DiagramItemX { get; set; }

        [JsonPropertyName("itemY")]
        public int DiagramItemY { get; set; }
    }
}
