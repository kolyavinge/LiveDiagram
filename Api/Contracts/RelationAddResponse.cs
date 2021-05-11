﻿using System.Collections.Generic;
using System.Text.Json.Serialization;
using LiveDiagram.Api.Model;

namespace LiveDiagram.Api.Contracts
{
    public class RelationAddResponse : DiagramResponse
    {
        [JsonPropertyName("relations")]
        public IEnumerable<Relation> Relations { get; set; }
    }
}