using System;

namespace LiveDiagram.Api.Contracts.Common
{
    public class DiagramMeta
    {
        public string DiagramId { get; set; }

        public string Title { get; set; }

        public string TitleLetter { get; set; }

        public int TitleNumber { get; set; }

        public DateTime CreateDate { get; set; }

        public DateTime UpdateDate { get; set; }
    }
}
