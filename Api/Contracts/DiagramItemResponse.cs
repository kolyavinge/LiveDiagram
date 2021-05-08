using System.Text.Json.Serialization;

namespace LiveDiagram.Api.Contracts
{
    public abstract class DiagramItemResponse : DiagramResponse
    {
        [JsonPropertyName("itemId")]
        public string DiagramItemId { get; set; }
    }
}
