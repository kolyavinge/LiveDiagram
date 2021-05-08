﻿using System.Text.Json.Serialization;

namespace LiveDiagram.Api.Contracts
{
    public class DiagramItemDeleteRequest : Request
    {
        [JsonPropertyName("diagramId")]
        public string DiagramId { get; set; }

        [JsonPropertyName("itemId")]
        public string DiagramItemId { get; set; }
    }
}
