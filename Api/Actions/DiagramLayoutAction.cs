using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using LiveDiagram.Api.Common;
using LiveDiagram.Api.Model;

namespace LiveDiagram.Api.Actions
{
    public class DiagramLayoutAction : LiveDiagram.Api.Common.Action
    {
        private readonly Diagram _diagram;

        [JsonPropertyName("layoutItemsOld")]
        public List<DiagramLayoutItem> LayoutItemsOld { get; }

        [JsonPropertyName("layoutItemsNew")]
        public List<DiagramLayoutItem> LayoutItemsNew { get; }

        public DiagramLayoutAction(string actionId, Diagram diagram, List<DiagramLayoutItem> layoutItemsOld, List<DiagramLayoutItem> layoutItemsNew) : base(actionId)
        {
            _diagram = diagram;
            LayoutItemsOld = layoutItemsOld;
            LayoutItemsNew = layoutItemsNew;
        }

        public override void Do()
        {
            foreach (var layoutItem in LayoutItemsNew)
            {
                var item = _diagram.Items.FirstOrDefault(x => x.Id == layoutItem.Id);
                if (item == null) continue;
                item.X = layoutItem.X;
                item.Y = layoutItem.Y;
                item.Width = layoutItem.Width;
                item.Height = layoutItem.Height;
            }
        }
    }
}
