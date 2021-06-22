using System.Text.Json.Serialization;
using LiveDiagram.Api.Model;

namespace LiveDiagram.Api.Contracts.Data
{
    public interface IRelationEditData
    {
        [JsonPropertyName("relationOld")]
        Relation RelationOld { get; set; }

        [JsonPropertyName("relationNew")]
        Relation RelationNew { get; set; }
    }
}
