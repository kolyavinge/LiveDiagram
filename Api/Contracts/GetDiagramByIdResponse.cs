using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using LiveDiagram.Api.Model;

namespace LiveDiagram.Api.Contracts
{
    public class GetDiagramByIdResponse : Response
    {
        [JsonPropertyName("diagram")]
        public Diagram Diagram { get; set; }
    }
}
