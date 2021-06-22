using System.Collections.Generic;
using System.Text.Json.Serialization;
using LiveDiagram.Api.Common;

namespace LiveDiagram.Api.Contracts.Data
{
    public interface IDiagramLayoutData
    {
        [JsonPropertyName("items")]
        IEnumerable<DiagramLayoutItem> Items { get; set; }
    }
}
