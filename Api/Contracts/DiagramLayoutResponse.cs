using System.Collections.Generic;
using System.Text.Json.Serialization;
using LiveDiagram.Api.Common;

namespace LiveDiagram.Api.Contracts
{
    public class DiagramLayoutResponse : Response
    {
        [JsonPropertyName("items")]
        public IEnumerable<DiagramLayoutItem> Items { get; set; }
    }
}
