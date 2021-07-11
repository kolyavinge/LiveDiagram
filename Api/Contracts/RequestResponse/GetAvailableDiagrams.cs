using System.Collections.Generic;
using System.Text.Json.Serialization;
using LiveDiagram.Api.Contracts.Common;

namespace LiveDiagram.Api.Contracts.RequestResponse
{
    public class GetAvailableDiagramsRequest : Request
    {
        [JsonPropertyName("countOnly")]
        public bool CountOnly { get; set; }

        [JsonPropertyName("includeThumbnails")]
        public bool IncludeThumbnails { get; set; }

        [JsonPropertyName("batch")]
        public Batch Batch { get; set; }

        public GetAvailableDiagramsRequest()
        {
            CountOnly = false;
            IncludeThumbnails = false;
        }
    }

    public class GetAvailableDiagramsResponse : Response
    {
        [JsonPropertyName("count")]
        public int Count { get; set; }

        [JsonPropertyName("availableDiagrams")]
        public List<AvailableDiagram> AvailableDiagrams { get; set; }
    }
}
