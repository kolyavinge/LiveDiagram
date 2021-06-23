using System.Collections.Generic;
using System.Text.Json.Serialization;
using LiveDiagram.Api.Contracts.Data;
using LiveDiagram.Api.Model;

namespace LiveDiagram.Api.Actions
{
    public class DiagramItemEditAction : LiveDiagram.Api.Common.Action, IDiagramItemEditData
    {
        [JsonPropertyName("itemId")]
        public string DiagramItemId { get; set; }

        [JsonPropertyName("itemTitle")]
        public string DiagramItemTitle { get; set; }

        [JsonPropertyName("parentHasChanged")]
        public bool ParentHasChanged { get; set; }

        [JsonPropertyName("parentRelation")]
        public Relation ParentRelation { get; set; }

        [JsonPropertyName("methods")]
        public IEnumerable<Method> Methods { get; set; }

        public DiagramItemEditAction(string actionId, IDiagramItemEditData data) : base(actionId)
        {
            DiagramItemId = data.DiagramItemId;
            DiagramItemTitle = data.DiagramItemTitle;
            ParentHasChanged = data.ParentHasChanged;
            ParentRelation = data.ParentRelation;
            Methods = data.Methods;
        }
    }
}
