using System.Collections.Generic;
using System.Text.Json.Serialization;
using LiveDiagram.Api.Contracts.Data;

namespace LiveDiagram.Api.Contracts.RequestResponse
{
    public class RelationDeleteRequest : Request, IRelationDeleteData
    {
        [JsonPropertyName("relationsId")]
        public IEnumerable<string> RelationsId { get; set; }
    }

    public class RelationDeleteResponse : Response, IRelationDeleteData
    {
        [JsonPropertyName("relationsId")]
        public IEnumerable<string> RelationsId { get; set; }
    }
}
