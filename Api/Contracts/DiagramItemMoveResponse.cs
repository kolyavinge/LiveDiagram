﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace LiveDiagram.Api.Contracts
{
    public class DiagramItemMoveResponse : DiagramItemResponse
    {
        [JsonPropertyName("success")]
        public bool Success { get; set; }

        [JsonPropertyName("x")]
        public int DiagramItemX { get; set; }

        [JsonPropertyName("y")]
        public int DiagramItemY { get; set; }
    }
}
