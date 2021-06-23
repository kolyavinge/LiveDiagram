using System.Text.Json.Serialization;

namespace LiveDiagram.Api.Common
{
    public abstract class Action
    {
        [JsonPropertyName("actionId")]
        public string Id { get; }

        [JsonPropertyName("type")]
        public string Type { get { return GetType().Name; } }

        public Action(string actionId)
        {
            Id = actionId;
        }
    }
}
