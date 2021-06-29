using System;
using System.Diagnostics.CodeAnalysis;
using System.Text.Json.Serialization;

namespace LiveDiagram.Api.Model
{
    public class AvailableDiagram : IEquatable<AvailableDiagram>
    {
        [JsonPropertyName("id")]
        public string Id { get; set; }

        [JsonPropertyName("title")]
        public string Title { get; set; }

        public override bool Equals(object obj)
        {
            return obj is AvailableDiagram diagram && Id == diagram.Id;
        }

        public override int GetHashCode()
        {
            return HashCode.Combine(Id);
        }

        public bool Equals([AllowNull] AvailableDiagram other)
        {
            return Equals((object)other);
        }
    }
}
