using System.Text.Json.Serialization;
using LiveDiagram.Api.Model;

namespace LiveDiagram.Api.Actions
{
    public class RelationEditAction : LiveDiagram.Api.Common.Action
    {
        private readonly Diagram _diagram;

        [JsonPropertyName("relationOld")]
        public Relation RelationOld { get; }

        [JsonPropertyName("relationNew")]
        public Relation RelationNew { get; }

        public RelationEditAction(string actionId, Diagram diagram, Relation relationOld, Relation relationNew) : base(actionId)
        {
            _diagram = diagram;
            RelationOld = relationOld;
            RelationNew = relationNew;
        }

        public override void Do()
        {
            if (RelationOld != null)
            {
                _diagram.Relations.RemoveAll(x => x.Id == RelationOld.Id);
            }
            if (RelationNew != null)
            {
                _diagram.Relations.Add(RelationNew);
            }
        }
    }
}
