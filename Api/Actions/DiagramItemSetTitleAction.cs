using System.Text.Json.Serialization;
using LiveDiagram.Api.Contracts.Data;

namespace LiveDiagram.Api.Actions
{
    public class DiagramItemSetTitleAction : LiveDiagram.Api.Common.Action, IDiagramItemSetTitleData
    {
        [JsonPropertyName("itemId")]
        public string DiagramItemId { get; set; }

        [JsonPropertyName("itemTitle")]
        public string DiagramItemTitle { get; set; }

        public DiagramItemSetTitleAction(string actionId, IDiagramItemSetTitleData data) : base(actionId)
        {
            DiagramItemId = data.DiagramItemId;
            DiagramItemTitle = data.DiagramItemTitle;
        }
    }
}
