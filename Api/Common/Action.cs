using System.Text.Json.Serialization;
using LiveDiagram.Api.Model;

namespace LiveDiagram.Api.Common
{
    public abstract class Action
    {
        [JsonPropertyName("id")]
        public string Id { get; }

        [JsonPropertyName("type")]
        public string Type { get { return GetType().Name; } }

        public abstract void Do();

        public Action(string actionId)
        {
            Id = actionId;
        }
    }
}
