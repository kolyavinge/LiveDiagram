using System.Collections.Generic;
using System.Text.Json.Serialization;
using LiveDiagram.Api.Contracts.Data;

namespace LiveDiagram.Api.Contracts.RequestResponse
{
    public class DiagramItemMoveRequest : Request, IDiagramItemMoveData
    {
        [JsonPropertyName("items")]
        public IEnumerable<DiagramItemPosition> Items { get; set; }
    }

    public class DiagramItemMoveResponse : Response, IDiagramItemMoveData
    {
        [JsonPropertyName("items")]
        public IEnumerable<DiagramItemPosition> Items { get; set; }
    }
}
