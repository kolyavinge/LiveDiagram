using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace LiveDiagram.Api.SignalR
{
    [Serializable]
    public struct RegisterData
    {
        [JsonPropertyName("clientId")]
        public string ClientId { get; set; }

        [JsonPropertyName("diagramId")]
        public string DiagramId { get; set; }
    }
}
