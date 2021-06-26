using System.Collections.Generic;
using System.Text.Json.Serialization;
using LiveDiagram.Api.Contracts.Data;

namespace LiveDiagram.Api.Contracts.RequestResponse
{
    public class DiagramItemResizeRequest : Request, IDiagramItemResizeData
    {
        [JsonPropertyName("items")]
        public IEnumerable<DiagramItemResizePosition> Items { get; set; }
    }

    public class DiagramItemResizeResponse : Response, IDiagramItemResizeData
    {
        [JsonPropertyName("items")]
        public IEnumerable<DiagramItemResizePosition> Items { get; set; }
    }
}
