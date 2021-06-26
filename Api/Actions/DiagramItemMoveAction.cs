using System.Collections.Generic;
using System.Text.Json.Serialization;
using LiveDiagram.Api.Contracts.Data;

namespace LiveDiagram.Api.Actions
{
    public class DiagramItemMoveAction : LiveDiagram.Api.Common.Action, IDiagramItemMoveData
    {
        [JsonPropertyName("items")]
        public IEnumerable<DiagramItemPosition> Items { get; set; }

        public DiagramItemMoveAction(string actionId, IDiagramItemMoveData data) : base(actionId)
        {
            Items = data.Items;
        }
    }
}
