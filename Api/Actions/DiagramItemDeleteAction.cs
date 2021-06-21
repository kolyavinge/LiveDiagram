using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using LiveDiagram.Api.Model;

namespace LiveDiagram.Api.Actions
{
    public class DiagramItemDeleteAction : LiveDiagram.Api.Common.Action
    {
        private readonly Diagram _diagram;

        [JsonPropertyName("items")]
        public List<DiagramItem> Items { get; }

        [JsonPropertyName("relations")]
        public List<Relation> Relations { get; }

        public DiagramItemDeleteAction(string actionId, Diagram diagram, List<DiagramItem> items, List<Relation> relations) : base(actionId)
        {
            _diagram = diagram;
            Items = items;
            Relations = relations;
        }

        public override void Do()
        {
            var itemsId = Items.Select(x => x.Id).ToList();
            _diagram.Items.RemoveAll(x => itemsId.Contains(x.Id));

            var relationsId = Relations.Select(x => x.Id).ToList();
            _diagram.Relations.RemoveAll(x => relationsId.Contains(x.Id));
        }
    }
}
