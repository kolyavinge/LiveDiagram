using System.Collections.Generic;
using System.Text.Json.Serialization;
using LiveDiagram.Api.Contracts.Data;

namespace LiveDiagram.Api.Contracts.RequestResponse
{
    public class DiagramItemDeleteRequest : Request, IDiagramItemDeleteData
    {
        [JsonPropertyName("itemsId")]
        public IEnumerable<string> DiagramItemsId { get; set; }

        [JsonPropertyName("relationsId")]
        public IEnumerable<string> RelationsId { get; set; }
    }

    public class DiagramItemDeleteResponse : Response, IDiagramItemDeleteData
    {
        [JsonPropertyName("itemsId")]
        public IEnumerable<string> DiagramItemsId { get; set; }

        [JsonPropertyName("relationsId")]
        public IEnumerable<string> RelationsId { get; set; }
    }
}
