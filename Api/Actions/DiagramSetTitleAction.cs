using System.Text.Json.Serialization;
using LiveDiagram.Api.Model;

namespace LiveDiagram.Api.Actions
{
    public class DiagramSetTitleAction : LiveDiagram.Api.Common.Action
    {
        private readonly Diagram _diagram;

        [JsonPropertyName("titleOld")]
        public string TitleOld { get; }

        [JsonPropertyName("titleNew")]
        public string TitleNew { get; }

        public DiagramSetTitleAction(string actionId, Diagram diagram, string titleOld, string titleNew) : base(actionId)
        {
            _diagram = diagram;
            TitleOld = titleOld;
            TitleNew = titleNew;
        }

        public override void Do()
        {
            _diagram.Title = TitleNew;
        }
    }
}
