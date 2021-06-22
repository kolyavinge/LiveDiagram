using System.Collections.Generic;
using System.Text.Json.Serialization;
using LiveDiagram.Api.Contracts.Data;
using LiveDiagram.Api.Model;

namespace LiveDiagram.Api.Contracts.RequestResponse
{
    public class DiagramItemEditRequest : Request, IDiagramItemEditData
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

    public class DiagramItemEditResponse : Response, IDiagramItemEditData
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
