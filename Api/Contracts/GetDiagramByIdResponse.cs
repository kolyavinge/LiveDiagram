using System.Collections.Generic;
using System.Text.Json.Serialization;
using LiveDiagram.Api.Common;
using LiveDiagram.Api.Model;

namespace LiveDiagram.Api.Contracts
{
    public class GetDiagramByIdResponse : Response
    {
        [JsonPropertyName("diagram")]
        public Diagram Diagram { get; set; }

        [JsonPropertyName("actions")]
        public List<object> Actions { get; set; }

        [JsonPropertyName("activeActionId")]
        public string ActiveActionId { get; set; }
    }
}
