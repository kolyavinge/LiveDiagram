using System.Collections.Generic;
using System.Text.Json.Serialization;
using LiveDiagram.Api.Common;
using LiveDiagram.Api.Contracts.Data;

namespace LiveDiagram.Api.Actions
{
    public class DiagramLayoutAction : LiveDiagram.Api.Common.Action, IDiagramLayoutData
    {
        [JsonPropertyName("items")]
        public IEnumerable<DiagramLayoutItem> Items { get; set; }

        public DiagramLayoutAction(string actionId, IDiagramLayoutData data) : base(actionId)
        {
            Items = data.Items;
        }
    }
}
