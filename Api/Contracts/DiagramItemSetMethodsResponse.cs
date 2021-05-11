using System.Collections.Generic;
using System.Text.Json.Serialization;
using LiveDiagram.Api.Model;

namespace LiveDiagram.Api.Contracts
{
    public class DiagramItemSetMethodsResponse : DiagramResponse
    {
        [JsonPropertyName("itemId")]
        public string DiagramItemId { get; set; }

        [JsonPropertyName("methods")]
        public IEnumerable<Method> Methods { get; set; }
    }
}
