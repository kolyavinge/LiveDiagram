using System.Collections.Generic;
using System.Text.Json.Serialization;
using LiveDiagram.Api.Model;

namespace LiveDiagram.Api.Contracts
{
    public class RelationAddRequest : Request
    {
        [JsonPropertyName("diagramId")]
        public string DiagramId { get; set; }

        [JsonPropertyName("relations")]
        public IEnumerable<Relation> Relations { get; set; }
    }
}
