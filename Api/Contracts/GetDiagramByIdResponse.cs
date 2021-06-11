using System.Text.Json.Serialization;
using LiveDiagram.Api.Model;

namespace LiveDiagram.Api.Contracts
{
    public class GetDiagramByIdResponse : Response
    {
        [JsonPropertyName("diagram")]
        public Diagram Diagram { get; set; }
    }
}
