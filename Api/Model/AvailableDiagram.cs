﻿using System.Text.Json.Serialization;

namespace LiveDiagram.Api.Model
{
    public class AvailableDiagram
    {
        [JsonPropertyName("id")]
        public string Id { get; set; }

        [JsonPropertyName("title")]
        public string Title { get; set; }
    }
}