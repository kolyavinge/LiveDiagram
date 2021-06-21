using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using LiveDiagram.Api.Model;

namespace LiveDiagram.Api.Actions
{
    public class RelationDeleteAction : LiveDiagram.Api.Common.Action
    {
        private readonly Diagram _diagram;

        [JsonPropertyName("relations")]
        public List<Relation> Relations { get; }

        public RelationDeleteAction(string actionId, Diagram diagram, List<Relation> relations) : base(actionId)
        {
            _diagram = diagram;
            Relations = relations;
        }

        public override void Do()
        {
            var ids = Relations.Select(x => x.Id).ToList();
            _diagram.Relations.RemoveAll(x => ids.Contains(x.Id));
        }
    }
}
