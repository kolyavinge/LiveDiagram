using System.Text.Json.Serialization;

namespace LiveDiagram.Api.Model
{
    public class Relation
    {
        [JsonPropertyName("id")]
        public string Id { get; set; }

        [JsonPropertyName("itemIdFrom")]
        public string DiagramItemIdFrom { get; set; }

        [JsonPropertyName("itemIdTo")]
        public string DiagramItemIdTo { get; set; }

        [JsonPropertyName("itemFrom")]
        public DiagramItem DiagramItemFrom { get; set; }

        [JsonPropertyName("itemTo")]
        public DiagramItem DiagramItemTo { get; set; }
    }
}
