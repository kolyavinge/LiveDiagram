using System.Collections.Generic;
using System.Linq;
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
                var diagramActions = _actions[diagram];
                var activeAction = diagramActions.Actions.First(x => x.Id == diagramActions.ActiveActionId);
                var activeActionIndex = diagramActions.Actions.IndexOf(activeAction);
                if (activeActionIndex + 1 < diagramActions.Actions.Count)
                {
                    diagramActions.Actions.RemoveRange(activeActionIndex + 1, diagramActions.Actions.Count - (activeActionIndex + 1));
                }
                diagramActions.Actions.Add(action);
            }
            else
            {
                _actions.Add(diagram, new DiagramActions { Actions = new List<Action> { action } });
            }
            _actions[diagram].ActiveActionId = action.Id;
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
