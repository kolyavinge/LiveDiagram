using System.Collections.Generic;
using System.Text.Json.Serialization;
using LiveDiagram.Api.Contracts.Data;
using LiveDiagram.Api.Model;

namespace LiveDiagram.Api.Actions
{
    public class RelationAddAction : LiveDiagram.Api.Common.Action, IRelationAddData
    {
        [JsonPropertyName("relations")]
        public IEnumerable<Relation> Relations { get; set; }

        public RelationAddAction(string actionId, IRelationAddData data) : base(actionId)
        {
            Relations = data.Relations;
        }
    }
}
