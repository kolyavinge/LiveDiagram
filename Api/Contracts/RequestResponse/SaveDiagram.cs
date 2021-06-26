using System.Text.Json.Serialization;
using LiveDiagram.Api.Model;

namespace LiveDiagram.Api.Contracts.RequestResponse
{
    public class SaveDiagramRequest : Request
    {
        [JsonPropertyName("diagram")]
        public Diagram Diagram { get; set; }
    }

    public class SaveDiagramResponse : Response
    {
    }
}
