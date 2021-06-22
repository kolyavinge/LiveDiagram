using System.Text.Json.Serialization;
using LiveDiagram.Api.Contracts.Data;

namespace LiveDiagram.Api.Contracts.RequestResponse
{
    public class DiagramSetTitleRequest : Request, IDiagramSetTitleData
    {
        [JsonPropertyName("diagramTitle")]
        public string DiagramTitle { get; set; }
    }

    public class DiagramSetTitleResponse : Response, IDiagramSetTitleData
    {
        [JsonPropertyName("diagramTitle")]
        public string DiagramTitle { get; set; }
    }
}
