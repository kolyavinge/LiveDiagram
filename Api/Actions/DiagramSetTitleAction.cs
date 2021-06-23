using System.Text.Json.Serialization;
using LiveDiagram.Api.Contracts.Data;

namespace LiveDiagram.Api.Actions
{
    public class DiagramSetTitleAction : LiveDiagram.Api.Common.Action, IDiagramSetTitleData
    {
        [JsonPropertyName("diagramTitle")]
        public string DiagramTitle { get; set; }

        public DiagramSetTitleAction(string actionId, IDiagramSetTitleData data) : base(actionId)
        {
            DiagramTitle = data.DiagramTitle;
        }
    }
}
