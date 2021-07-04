using System.Collections.Generic;
using System.Text.Json.Serialization;
using LiveDiagram.Api.Contracts.Common;

namespace LiveDiagram.Api.Contracts.RequestResponse
{
    public class GetAvailableDiagramsRequest : Request
    {
        [JsonPropertyName("includeThumbnails")]
        public bool IncludeThumbnails { get; set; }

        public GetAvailableDiagramsRequest()
        {
            IncludeThumbnails = false;
        }
    }

    public class GetAvailableDiagramsResponse : Response
    {
        [JsonPropertyName("availableDiagrams")]
        public List<AvailableDiagram> AvailableDiagrams { get; set; }
    }
}
