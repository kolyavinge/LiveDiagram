using System.Text.Json.Serialization;
using LiveDiagram.Api.Contracts.Data;
using LiveDiagram.Api.Model;

namespace LiveDiagram.Api.Contracts.RequestResponse
{
    public class DiagramItemAddRequest : Request, IDiagramItemAddData
    {
        [JsonPropertyName("item")]
        public DiagramItem Item { get; set; }

        [JsonPropertyName("parentRelation")]
        public Relation ParentRelation { get; set; }
    }

    public class DiagramItemAddResponse : Response, IDiagramItemAddData
    {
        [JsonPropertyName("item")]
        public DiagramItem Item { get; set; }

        [JsonPropertyName("parentRelation")]
        public Relation ParentRelation { get; set; }
    }
}
