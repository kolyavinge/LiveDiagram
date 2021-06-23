using System.Collections.Generic;
using System.Text.Json.Serialization;
using LiveDiagram.Api.Contracts.Data;

namespace LiveDiagram.Api.Actions
{
    public class DiagramItemDeleteAction : LiveDiagram.Api.Common.Action, IDiagramItemDeleteData
    {
        [JsonPropertyName("itemsId")]
        public IEnumerable<string> DiagramItemsId { get; set; }

        [JsonPropertyName("relationsId")]
        public IEnumerable<string> RelationsId { get; set; }

        public DiagramItemDeleteAction(string actionId, IDiagramItemDeleteData data) : base(actionId)
        {
            DiagramItemsId = data.DiagramItemsId;
            RelationsId = data.RelationsId;
        }
    }
}
