using System.Collections.Generic;
using System.Text.Json.Serialization;
using LiveDiagram.Api.Model;

namespace LiveDiagram.Api.Contracts.Data
{
    public interface IRelationAddData
    {
        [JsonPropertyName("relations")]
        IEnumerable<Relation> Relations { get; set; }
    }
}
