using System.Collections.Generic;
using System.Text.Json.Serialization;
using LiveDiagram.Api.Model;

namespace LiveDiagram.Api.Contracts
{
    public class DiagramItemEditRequest : Request
    {
        [JsonPropertyName("itemId")]
        public string DiagramItemId { get; set; }

        [JsonPropertyName("itemTitle")]
        public string DiagramItemTitle { get; set; }

        [JsonPropertyName("parentHasChanged")]
        public bool ParentHasChanged { get; set; }

        [JsonPropertyName("parentRelation")]
        public Relation ParentRelation { get; set; }

        [JsonPropertyName("methods")]
        public IEnumerable<Method> Methods { get; set; }
    }
}
