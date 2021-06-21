using System.Collections.Generic;
using System.Text.Json.Serialization;
using LiveDiagram.Api.Model;

namespace LiveDiagram.Api.Actions
{
    public class DiagramItemEditAction : LiveDiagram.Api.Common.Action
    {
        private readonly Diagram _diagram;

        [JsonPropertyName("item")]
        public DiagramItem Item { get; }

        [JsonPropertyName("titleOld")]
        public string TitleOld { get; }

        [JsonPropertyName("titleNew")]
        public string TitleNew { get; }

        [JsonPropertyName("parentRelationOld")]
        public Relation ParentRelationOld { get; }

        [JsonPropertyName("parentRelationNew")]
        public Relation ParentRelationNew { get; }

        [JsonPropertyName("methodsOld")]
        public List<Method> MethodsOld { get; }

        [JsonPropertyName("methodsNew")]
        public List<Method> MethodsNew { get; }

        public DiagramItemEditAction(
            string actionId,
            Diagram diagram,
            DiagramItem item,
            string titleOld,
            string titleNew,
            Relation parentRelationOld,
            Relation parentRelationNew,
            List<Method> methodsOld,
            List<Method> methodsNew) : base(actionId)
        {
            _diagram = diagram;
            Item = item;
            TitleOld = titleOld;
            TitleNew = titleNew;
            ParentRelationOld = parentRelationOld;
            ParentRelationNew = parentRelationNew;
            MethodsOld = methodsOld;
            MethodsNew = methodsNew;
        }

        public override void Do()
        {
            Item.Title = TitleNew;
            Item.Methods = MethodsNew;
            if (ParentRelationOld != null)
            {
                _diagram.Relations.RemoveAll(x => x.Id == ParentRelationOld.Id);
            }
            if (ParentRelationNew != null)
            {
                _diagram.Relations.Add(ParentRelationNew);
            }
        }
    }
}
