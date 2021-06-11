using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace LiveDiagram.Api.Contracts
{
    public class RelationDeleteRequest : Request
    {
        [JsonPropertyName("relationsId")]
        public IEnumerable<string> RelationsId { get; set; }
    }
}
