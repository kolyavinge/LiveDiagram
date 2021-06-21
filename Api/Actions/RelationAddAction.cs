using System.Collections.Generic;
using System.Text.Json.Serialization;
using LiveDiagram.Api.Model;

namespace LiveDiagram.Api.Actions
{
    public class RelationAddAction : LiveDiagram.Api.Common.Action
    {
        private readonly Diagram _diagram;

        [JsonPropertyName("relations")]
        public List<Relation> Relations { get; }

        public RelationAddAction(string actionId, Diagram diagram, List<Relation> relations) : base(actionId)
        {
            _diagram = diagram;
            Relations = relations;
        }

        public override void Do()
        {
            _diagram.Relations.AddRange(Relations);
        }
    }
}
