using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace LiveDiagram.Api.Contracts.Data
{
    public interface IRelationDeleteData
    {
        [JsonPropertyName("relationsId")]
        IEnumerable<string> RelationsId { get; set; }
    }
}
