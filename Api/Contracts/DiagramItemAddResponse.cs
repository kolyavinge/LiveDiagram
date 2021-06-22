using System.Collections.Generic;
using System.Text.Json.Serialization;
using LiveDiagram.Api.Model;

namespace LiveDiagram.Api.Contracts
{
    public class DiagramItemAddResponse : Response
    {
        [JsonPropertyName("item")]
        public DiagramItem Item { get; set; }

        [JsonPropertyName("parentRelation")]
        public Relation ParentRelation { get; set; }
    }
}
