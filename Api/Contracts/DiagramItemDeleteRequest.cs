﻿using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace LiveDiagram.Api.Contracts
{
    public class DiagramItemDeleteRequest : Request
    {
        [JsonPropertyName("itemsId")]
        public IEnumerable<string> DiagramItemsId { get; set; }

        [JsonPropertyName("relationsId")]
        public IEnumerable<string> RelationsId { get; set; }
    }
}
