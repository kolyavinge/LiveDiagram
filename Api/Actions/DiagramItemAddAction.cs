using System.Text.Json.Serialization;
using LiveDiagram.Api.Contracts.Data;
using LiveDiagram.Api.Model;

namespace LiveDiagram.Api.Actions
{
    public class DiagramItemAddAction : LiveDiagram.Api.Common.Action, IDiagramItemAddData
    {
        [JsonPropertyName("item")]
        public DiagramItem Item { get; set; }

        [JsonPropertyName("parentRelation")]
        public Relation ParentRelation { get; set; }

        public DiagramItemAddAction(string actionId, IDiagramItemAddData data) : base(actionId)
        {
            Item = data.Item;
            ParentRelation = data.ParentRelation;
        }
    }
}
