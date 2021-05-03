using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace LiveDiagram.Api.Model
{
    public class Relation
    {
        [JsonPropertyName("id")]
        public string Id { get; set; }

        [JsonPropertyName("itemIdFrom")]
        public string DiagramItemIdFrom { get; set; }

        [JsonPropertyName("itemIdTo")]
        public string DiagramItemIdTo { get; set; }
    }
}
