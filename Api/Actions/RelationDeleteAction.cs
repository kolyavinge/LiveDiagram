using System.Collections.Generic;
using System.Text.Json.Serialization;
using LiveDiagram.Api.Contracts.Data;

namespace LiveDiagram.Api.Actions
{
    public class RelationDeleteAction : LiveDiagram.Api.Common.Action, IRelationDeleteData
    {
        [JsonPropertyName("relationsId")]
        public IEnumerable<string> RelationsId { get; set; }

        public RelationDeleteAction(string actionId, IRelationDeleteData data) : base(actionId)
        {
            RelationsId = data.RelationsId;
        }
    }
}
