using System.Text.Json.Serialization;

namespace LiveDiagram.Api.Contracts
{
    public class DiagramSetTitleResponse : Response
    {
        [JsonPropertyName("diagramTitle")]
        public string DiagramTitle { get; set; }
    }
}
