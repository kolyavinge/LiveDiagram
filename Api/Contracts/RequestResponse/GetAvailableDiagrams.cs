using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using LiveDiagram.Api.Contracts.Common;
using LiveDiagram.Api.Services;
using LiveDiagram.Api.Utils;

namespace LiveDiagram.Api.Contracts.RequestResponse
{
    public class GetAvailableDiagramsRequest : Request
    {
        [JsonPropertyName("countOnly")]
        public bool CountOnly { get; set; }

        [JsonPropertyName("includeThumbnails")]
        public bool IncludeThumbnails { get; set; }

        [JsonPropertyName("filterTitle")]
        public string FilterTitle { get; set; }

        [JsonPropertyName("sort")]
        public string Sort { get; set; }

        [JsonPropertyName("batch")]
        public Batch Batch { get; set; }

        public GetAvailableDiagramsRequest()
        {
            CountOnly = false;
            IncludeThumbnails = false;
        }

        public DiagramSortField GetSort()
        {
            var sort = (Sort ?? "").Split(' ').First();
            if (sort.Equals("title", StringComparison.OrdinalIgnoreCase)) return DiagramSortField.Title;
            if (sort.Equals("create", StringComparison.OrdinalIgnoreCase)) return DiagramSortField.CreateDate;
            if (sort.Equals("update", StringComparison.OrdinalIgnoreCase)) return DiagramSortField.UpdateDate;

            return DiagramSortField.Title;
        }

        public SortDirection GetDirection()
        {
            var sort = (Sort ?? "").Split(' ').Last();
            if (sort.Equals("asc", StringComparison.OrdinalIgnoreCase)) return SortDirection.Asc;
            if (sort.Equals("desc", StringComparison.OrdinalIgnoreCase)) return SortDirection.Desc;

            return SortDirection.Asc;
        }
    }

    public class GetAvailableDiagramsResponse : Response
    {
        [JsonPropertyName("count")]
        public int Count { get; set; }

        [JsonPropertyName("availableDiagrams")]
        public List<AvailableDiagram> AvailableDiagrams { get; set; }
    }
}
