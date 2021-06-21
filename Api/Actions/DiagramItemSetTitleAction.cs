using System.Text.Json.Serialization;
using LiveDiagram.Api.Model;

namespace LiveDiagram.Api.Actions
{
    public class DiagramItemSetTitleAction : LiveDiagram.Api.Common.Action
    {
        [JsonPropertyName("item")]
        public DiagramItem Item { get; }

        [JsonPropertyName("titleOld")]
        public string TitleOld { get; }

        [JsonPropertyName("titleNew")]
        public string TitleNew { get; }

        public DiagramItemSetTitleAction(string actionId, DiagramItem item, string titleOld, string titleNew) : base(actionId)
        {
            Item = item;
            TitleOld = titleOld;
            TitleNew = titleNew;
        }

        public override void Do()
        {
            Item.Title = TitleNew;
        }
    }
}
