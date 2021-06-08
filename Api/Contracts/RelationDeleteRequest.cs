﻿using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace LiveDiagram.Api.Contracts
{
    public class RelationDeleteRequest : Request
    {
        [JsonPropertyName("actionId")]
        public string ActionId { get; set; }

        [JsonPropertyName("diagramId")]
        public string DiagramId { get; set; }

        [JsonPropertyName("relationsId")]
        public IEnumerable<string> RelationsId { get; set; }
    }
}
