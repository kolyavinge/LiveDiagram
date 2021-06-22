using System.Collections.Generic;
using System.Text.Json.Serialization;
using LiveDiagram.Api.Common;
using LiveDiagram.Api.Contracts.Data;

namespace LiveDiagram.Api.Contracts.RequestResponse
{
    public class DiagramLayoutRequest : Request, IDiagramLayoutData
    {
        [JsonPropertyName("items")]
        public IEnumerable<DiagramLayoutItem> Items { get; set; }
    }

    public class DiagramLayoutResponse : Response, IDiagramLayoutData
    {
        [JsonPropertyName("items")]
        public IEnumerable<DiagramLayoutItem> Items { get; set; }
    }
}
