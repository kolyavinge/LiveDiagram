using System.Collections.Generic;
using System.Text.Json.Serialization;
using LiveDiagram.Api.Model;

namespace LiveDiagram.Api.Contracts
{
    public class DiagramItemAddRequest : Request
    {
        [JsonPropertyName("item")]
        public DiagramItem Item { get; set; }

        [JsonPropertyName("parentRelation")]
        public Relation ParentRelation { get; set; }
    }
}
