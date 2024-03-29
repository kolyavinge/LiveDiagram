﻿using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace LiveDiagram.Api.Model
{
    public class DiagramItem
    {
        [JsonPropertyName("id")]
        public string Id { get; set; }

        [JsonPropertyName("title")]
        public string Title { get; set; }

        [JsonPropertyName("x")]
        public float X { get; set; }

        [JsonPropertyName("y")]
        public float Y { get; set; }

        [JsonPropertyName("width")]
        public float Width { get; set; }

        [JsonPropertyName("height")]
        public float Height { get; set; }

        [JsonPropertyName("methods")]
        public List<Method> Methods { get; set; }
    }
}
