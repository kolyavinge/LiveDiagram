using System.Text.Json.Serialization;
using LiveDiagram.Api.Contracts.Data;
using LiveDiagram.Api.Model;

namespace LiveDiagram.Api.Contracts.RequestResponse
{
    public class RelationEditRequest : Request, IRelationEditData
    {
        [JsonPropertyName("relationOld")]
        public Relation RelationOld { get; set; }

        [JsonPropertyName("relationNew")]
        public Relation RelationNew { get; set; }
    }

    public class RelationEditResponse : Response, IRelationEditData
    {
        [JsonPropertyName("relationOld")]
        public Relation RelationOld { get; set; }

        [JsonPropertyName("relationNew")]
        public Relation RelationNew { get; set; }
    }
}
