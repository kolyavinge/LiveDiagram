using System.Collections.Generic;
using System.Text.Json.Serialization;
using LiveDiagram.Api.Contracts.Data;
using LiveDiagram.Api.Model;

namespace LiveDiagram.Api.Contracts.RequestResponse
{
    public class RelationAddRequest : Request, IRelationAddData
    {
        [JsonPropertyName("relations")]
        public IEnumerable<Relation> Relations { get; set; }
    }

    public class RelationAddResponse : Response, IRelationAddData
    {
        [JsonPropertyName("relations")]
        public IEnumerable<Relation> Relations { get; set; }
    }
}
