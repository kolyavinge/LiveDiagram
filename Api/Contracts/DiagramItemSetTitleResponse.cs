﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace LiveDiagram.Api.Contracts
{
    public class DiagramItemSetTitleResponse : DiagramItemResponse
    {
        [JsonPropertyName("itemTitle")]
        public string DiagramItemTitle { get; set; }
    }
}
