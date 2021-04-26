using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace LiveDiagram.Api.Contracts
{
    public class DiagramItemMoveResponse
    {
        [JsonPropertyName("success")]
        public bool Success { get; set; }

        [JsonPropertyName("clientId")]
        public string ClientId { get; set; }

        [JsonPropertyName("diagramId")]
        public string DiagramId { get; set; }

        [JsonPropertyName("itemId")]
        public string DiagramItemId { get; set; }

        [JsonPropertyName("x")]
        public int DiagramItemX { get; set; }

        [JsonPropertyName("y")]
        public int DiagramItemY { get; set; }
    }
}
