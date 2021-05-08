using System.Text.Json.Serialization;

namespace LiveDiagram.Api.Contracts
{
    public class DiagramItemSetTitleResponse : DiagramResponse
    {
        [JsonPropertyName("itemId")]
        public string DiagramItemId { get; set; }

        [JsonPropertyName("itemTitle")]
        public string DiagramItemTitle { get; set; }
    }
}
