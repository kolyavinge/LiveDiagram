using System.Text.Json.Serialization;

namespace LiveDiagram.Api.Contracts.Data
{
    public interface IDiagramSetTitleData
    {
        [JsonPropertyName("diagramTitle")]
        string DiagramTitle { get; set; }
    }
}
