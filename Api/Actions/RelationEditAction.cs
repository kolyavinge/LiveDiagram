using System.Text.Json.Serialization;
using LiveDiagram.Api.Contracts.Data;
using LiveDiagram.Api.Model;

namespace LiveDiagram.Api.Actions
{
    public class RelationEditAction : LiveDiagram.Api.Common.Action, IRelationEditData
    {
        [JsonPropertyName("relationOld")]
        public Relation RelationOld { get; set; }

        [JsonPropertyName("relationNew")]
        public Relation RelationNew { get; set; }

        public RelationEditAction(string actionId, IRelationEditData data) : base(actionId)
        {
            RelationOld = data.RelationOld;
            RelationNew = data.RelationNew;
        }
    }
}
