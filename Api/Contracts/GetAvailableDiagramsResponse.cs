using System.Collections.Generic;
using System.Text.Json.Serialization;
using LiveDiagram.Api.Model;

namespace LiveDiagram.Api.Contracts
{
    public class GetAvailableDiagramsResponse : Response
    {
        [JsonPropertyName("availableDiagrams")]
        public List<AvailableDiagram> AvailableDiagrams { get; set; }
    }
}
