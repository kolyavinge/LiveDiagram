using System.Collections.Generic;
using System.Text.Json.Serialization;
using LiveDiagram.Api.Model;

namespace LiveDiagram.Api.Contracts.Data
{
    public interface IDiagramItemSetMethodsData
    {
        [JsonPropertyName("itemId")]
        string DiagramItemId { get; set; }

        [JsonPropertyName("methods")]
        IEnumerable<Method> Methods { get; set; }
    }
}
