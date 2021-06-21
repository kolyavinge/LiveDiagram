using System.Collections.Generic;
using LiveDiagram.Api.Common;
using LiveDiagram.Api.Model;

namespace LiveDiagram.Api.Services
{
    public interface IActionService
    {
        List<Action> GetDiagramActions(Diagram diagram);
        void AddAction(Diagram diagram, Action action);
        string GetActiveActionId(Diagram diagram);
        void SetActiveActionId(Diagram diagram, string actionId);
    }

    public class ActionService : IActionService
    {
        class DiagramActions
        {
            public List<Action> Actions { get; set; }
            public string ActiveActionId { get; set; }
        }

        private readonly Dictionary<Diagram, DiagramActions> _actions;

        public ActionService()
        {
            _actions = new Dictionary<Diagram, DiagramActions>();
        }

        public List<Action> GetDiagramActions(Diagram diagram)
        {
            if (_actions.ContainsKey(diagram))
            {
                return _actions[diagram].Actions;
            }
            else
            {
                return new List<Action>();
            }
        }

        public void AddAction(Diagram diagram, Action action)
        {
            if (_actions.ContainsKey(diagram))
            {
                _actions[diagram].Actions.Add(action);
            }
            else
            {
                _actions.Add(diagram, new DiagramActions { Actions = new List<Action> { action } });
            }
        }

        public string GetActiveActionId(Diagram diagram)
        {
            if (_actions.ContainsKey(diagram))
            {
                return _actions[diagram].ActiveActionId;
            }
            else
            {
                return null;
            }
        }

        public void SetActiveActionId(Diagram diagram, string actionId)
        {
            if (_actions.ContainsKey(diagram))
            {
                _actions[diagram].ActiveActionId = actionId;
            }
        }
    }
}
