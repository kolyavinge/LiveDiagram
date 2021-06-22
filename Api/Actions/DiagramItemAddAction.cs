﻿using System.Text.Json.Serialization;
using LiveDiagram.Api.Model;

namespace LiveDiagram.Api.Actions
{
    public class DiagramItemAddAction : LiveDiagram.Api.Common.Action
    {
        private readonly Diagram _diagram;

        [JsonPropertyName("item")]
        public DiagramItem Item { get; }

        [JsonPropertyName("parentRelation")]
        public Relation ParentRelation { get; }

        public DiagramItemAddAction(string actionId, Diagram diagram, DiagramItem item, Relation parentRelation) : base(actionId)
        {
            _diagram = diagram;
            Item = item;
            ParentRelation = parentRelation;
        }

        public override void Do()
        {
            _diagram.Items.Add(Item);
            if (ParentRelation != null)
            {
                _diagram.Relations.Add(ParentRelation);
            }
        }
    }
}
