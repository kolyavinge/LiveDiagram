using System.Collections.Generic;
using System.Text.Json.Serialization;
using LiveDiagram.Api.Contracts.Data;

namespace LiveDiagram.Api.Actions
{
    public class DiagramItemResizeAction : LiveDiagram.Api.Common.Action, IDiagramItemResizeData
    {
        [JsonPropertyName("items")]
        public IEnumerable<DiagramItemResizePosition> Items { get; set; }

        public DiagramItemResizeAction(string actionId, IDiagramItemResizeData data) : base(actionId)
        {
            Items = data.Items;
        }
    }
}
