using System.Collections.Generic;
using System.Text.Json.Serialization;
using LiveDiagram.Api.Model;

namespace LiveDiagram.Api.Contracts
{
    public class RelationEditRequest : Request
    {
        [JsonPropertyName("relationOld")]
        public Relation RelationOld { get; set; }

        [JsonPropertyName("relationNew")]
        public Relation RelationNew { get; set; }
    }
}
