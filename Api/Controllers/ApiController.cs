using System.Linq;
using LiveDiagram.Api.Actions;
using LiveDiagram.Api.Common;
using LiveDiagram.Api.Contracts.RequestResponse;
using LiveDiagram.Api.Model;
using LiveDiagram.Api.Services;
using LiveDiagram.Api.SignalR;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace LiveDiagram.Api.Controllers
{
    [ApiController]
    [Route("api")]
    [EnableCors]
    public class ApiController : ControllerBase
    {
        private readonly IDiagramService _diagramService;
        private readonly IActionService _actionService;
        private readonly IMainNotifier _mainNotifier;
        private readonly ILogger<ApiController> _logger;

        public ApiController(IDiagramService diagramService, IActionService actionService, IMainNotifier mainNotifier, ILogger<ApiController> logger)
        {
            _diagramService = diagramService;
            _actionService = actionService;
            _mainNotifier = mainNotifier;
            _logger = logger;
        }

        [HttpGet]
        [Route("TestAction")]
        public IActionResult TestAction()
        {
            return new JsonResult(new { ok = true });
        }

        [HttpPost]
        [Route("GetAvailableDiagrams")]
        public IActionResult GetAvailableDiagrams(GetAvailableDiagramsRequest request)
        {
            var response = new GetAvailableDiagramsResponse
            {
                Success = true,
                AvailableDiagrams = _diagramService.GetAvailableDiagrams().OrderBy(x => x.Title).ToList()
            };

            return new JsonResult(response);
        }

        [HttpPost]
        [Route("GetDiagramById")]
        public IActionResult GetDiagramById(GetDiagramByIdRequest request)
        {
            var diagram = _diagramService.GetDiagramById(request.DiagramId);
            var response = new GetDiagramByIdResponse
            {
                Success = true,
                Diagram = diagram,
                Actions = _actionService.GetDiagramActions(diagram).Cast<object>().ToList(),
                ActiveActionId = _actionService.GetActiveActionId(diagram)
            };

            return new JsonResult(response);
        }

        [HttpPost]
        [Route("DiagramSetTitle")]
        public IActionResult DiagramSetTitle(DiagramSetTitleRequest request)
        {
            var response = new DiagramSetTitleResponse
            {
                Success = true,
                ClientId = request.ClientId,
                ActionId = request.ActionId,
                DiagramId = request.DiagramId,
                DiagramTitle = request.DiagramTitle
            };
            _mainNotifier.DiagramSetTitleResponse(response);
            var diagram = _diagramService.GetDiagramById(request.DiagramId);
            var action = new DiagramSetTitleAction(request.ActionId, diagram, diagram.Title, request.DiagramTitle);
            action.Do();
            _actionService.AddAction(diagram, action);

            return Ok();
        }

        [HttpPost]
        [Route("DiagramLayout")]
        public IActionResult DiagramLayout(DiagramLayoutRequest request)
        {
            var response = new DiagramLayoutResponse
            {
                Success = true,
                ClientId = request.ClientId,
                ActionId = request.ActionId,
                DiagramId = request.DiagramId,
                Items = request.Items
            };
            _mainNotifier.DiagramLayoutResponse(response);
            var diagram = _diagramService.GetDiagramById(request.DiagramId);
            var itemsOld = diagram.Items.Select(item => new DiagramLayoutItem { Id = item.Id, X = item.X, Y = item.Y, Width = item.Width, Height = item.Height }).ToList();
            var action = new DiagramLayoutAction(request.ActionId, diagram, itemsOld, request.Items.ToList());
            action.Do();
            _actionService.AddAction(diagram, action);

            return Ok();
        }

        [HttpPost]
        [Route("DiagramItemMove")]
        public IActionResult DiagramItemMove(DiagramItemMoveRequest request)
        {
            var response = new DiagramItemMoveResponse
            {
                Success = true,
                ClientId = request.ClientId,
                ActionId = request.ActionId,
                DiagramId = request.DiagramId,
                DiagramItemId = request.DiagramItemId,
                DiagramItemX = request.DiagramItemX,
                DiagramItemY = request.DiagramItemY
            };
            _mainNotifier.DiagramItemMoveResponse(response);
            var diagram = _diagramService.GetDiagramById(request.DiagramId);
            var item = diagram.Items.FirstOrDefault(x => x.Id == request.DiagramItemId);
            var action = new DiagramItemMoveAction(request.ActionId, item, item.X, item.Y, request.DiagramItemX, request.DiagramItemY);
            action.Do();
            _actionService.AddAction(diagram, action);

            return Ok();
        }

        [HttpPost]
        [Route("DiagramItemResize")]
        public IActionResult DiagramItemResize(DiagramItemResizeRequest request)
        {
            var response = new DiagramItemResizeResponse
            {
                Success = true,
                ClientId = request.ClientId,
                ActionId = request.ActionId,
                DiagramId = request.DiagramId,
                DiagramItemId = request.DiagramItemId,
                DiagramItemX = request.DiagramItemX,
                DiagramItemY = request.DiagramItemY,
                DiagramItemWidth = request.DiagramItemWidth,
                DiagramItemHeight = request.DiagramItemHeight
            };
            _mainNotifier.DiagramItemResizeResponse(response);
            var diagram = _diagramService.GetDiagramById(request.DiagramId);
            var item = diagram.Items.FirstOrDefault(x => x.Id == request.DiagramItemId);
            var action = new DiagramItemResizeAction(
                request.ActionId, item, item.X, item.Y, request.DiagramItemX, request.DiagramItemY, item.Width, item.Height, request.DiagramItemWidth, request.DiagramItemHeight);
            action.Do();
            _actionService.AddAction(diagram, action);

            return Ok();
        }

        [HttpPost]
        [Route("DiagramItemSetTitle")]
        public IActionResult DiagramItemSetTitle(DiagramItemSetTitleRequest request)
        {
            var response = new DiagramItemSetTitleResponse
            {
                Success = true,
                ClientId = request.ClientId,
                ActionId = request.ActionId,
                DiagramId = request.DiagramId,
                DiagramItemId = request.DiagramItemId,
                DiagramItemTitle = request.DiagramItemTitle
            };
            _mainNotifier.DiagramItemSetTitleResponse(response);
            var diagram = _diagramService.GetDiagramById(request.DiagramId);
            var item = diagram.Items.FirstOrDefault(x => x.Id == request.DiagramItemId);
            var action = new DiagramItemSetTitleAction(request.ActionId, item, item.Title, request.DiagramItemTitle);
            action.Do();
            _actionService.AddAction(diagram, action);

            return Ok();
        }

        [HttpPost]
        [Route("DiagramItemAdd")]
        public IActionResult DiagramItemAdd(DiagramItemAddRequest request)
        {
            var response = new DiagramItemAddResponse
            {
                Success = true,
                ClientId = request.ClientId,
                ActionId = request.ActionId,
                DiagramId = request.DiagramId,
                Item = request.Item,
                ParentRelation = request.ParentRelation,
            };
            _mainNotifier.DiagramItemAddResponse(response);
            var diagram = _diagramService.GetDiagramById(request.DiagramId);
            if (request.ParentRelation != null)
            {
                request.ParentRelation.DiagramItemFrom = diagram.Items.FirstOrDefault(x => x.Id == request.ParentRelation.DiagramItemIdFrom);
                request.ParentRelation.DiagramItemTo = diagram.Items.FirstOrDefault(x => x.Id == request.ParentRelation.DiagramItemIdTo);
            }
            var action = new DiagramItemAddAction(request.ActionId, diagram, request.Item, request.ParentRelation);
            action.Do();
            _actionService.AddAction(diagram, action);

            return Ok();
        }

        [HttpPost]
        [Route("DiagramItemEdit")]
        public IActionResult DiagramItemEdit(DiagramItemEditRequest request)
        {
            var response = new DiagramItemEditResponse
            {
                Success = true,
                ClientId = request.ClientId,
                ActionId = request.ActionId,
                DiagramId = request.DiagramId,
                DiagramItemId = request.DiagramItemId,
                DiagramItemTitle = request.DiagramItemTitle,
                ParentHasChanged = request.ParentHasChanged,
                ParentRelation = request.ParentRelation,
                Methods = request.Methods
            };
            _mainNotifier.DiagramItemEditResponse(response);
            var diagram = _diagramService.GetDiagramById(request.DiagramId);
            var item = diagram.Items.FirstOrDefault(x => x.Id == request.DiagramItemId);
            Relation parentRelationOld = null;
            if (request.ParentHasChanged)
            {
                parentRelationOld = diagram.Relations.FirstOrDefault(x => x.DiagramItemIdTo == item.Id);
                if (parentRelationOld != null)
                {
                    parentRelationOld.DiagramItemFrom = diagram.Items.FirstOrDefault(x => x.Id == parentRelationOld.DiagramItemIdFrom);
                    parentRelationOld.DiagramItemTo = diagram.Items.FirstOrDefault(x => x.Id == parentRelationOld.DiagramItemIdTo);
                }
            }
            if (request.ParentRelation != null)
            {
                request.ParentRelation.DiagramItemFrom = diagram.Items.FirstOrDefault(x => x.Id == request.ParentRelation.DiagramItemIdFrom);
                request.ParentRelation.DiagramItemTo = diagram.Items.FirstOrDefault(x => x.Id == request.ParentRelation.DiagramItemIdTo);
            }
            var action = new DiagramItemEditAction(
                request.ActionId, diagram, item, item.Title, request.DiagramItemTitle, parentRelationOld, request.ParentRelation, item.Methods, request.Methods.ToList());
            action.Do();
            _actionService.AddAction(diagram, action);

            return Ok();
        }

        [HttpPost]
        [Route("DiagramItemDelete")]
        public IActionResult DiagramItemDelete(DiagramItemDeleteRequest request)
        {
            var response = new DiagramItemDeleteResponse
            {
                Success = true,
                ClientId = request.ClientId,
                ActionId = request.ActionId,
                DiagramId = request.DiagramId,
                DiagramItemsId = request.DiagramItemsId,
                RelationsId = request.RelationsId
            };
            _mainNotifier.DiagramItemDeleteResponse(response);
            var diagram = _diagramService.GetDiagramById(request.DiagramId);
            var items = diagram.Items.Where(x => request.DiagramItemsId.Contains(x.Id)).ToList();
            var relations = diagram.Relations.Where(x => request.RelationsId.Contains(x.Id)).ToList();
            foreach (var relation in relations)
            {
                relation.DiagramItemFrom = diagram.Items.FirstOrDefault(x => x.Id == relation.DiagramItemIdFrom);
                relation.DiagramItemTo = diagram.Items.FirstOrDefault(x => x.Id == relation.DiagramItemIdTo);
            }
            var action = new DiagramItemDeleteAction(request.ActionId, diagram, items, relations);
            action.Do();
            _actionService.AddAction(diagram, action);

            return Ok();
        }

        [HttpPost]
        [Route("DiagramItemSetMethods")]
        public IActionResult DiagramItemSetMethods(DiagramItemSetMethodsRequest request)
        {
            var response = new DiagramItemSetMethodsResponse
            {
                Success = true,
                ClientId = request.ClientId,
                DiagramId = request.DiagramId,
                DiagramItemId = request.DiagramItemId,
                Methods = request.Methods
            };
            _mainNotifier.DiagramItemSetMethodsResponse(response);

            return Ok();
        }

        [HttpPost]
        [Route("RelationAdd")]
        public IActionResult RelationAdd(RelationAddRequest request)
        {
            var response = new RelationAddResponse
            {
                Success = true,
                ClientId = request.ClientId,
                ActionId = request.ActionId,
                DiagramId = request.DiagramId,
                Relations = request.Relations
            };
            _mainNotifier.RelationAddResponse(response);
            var diagram = _diagramService.GetDiagramById(request.DiagramId);
            var relations = request.Relations.ToList();
            foreach (var relation in relations)
            {
                relation.DiagramItemFrom = diagram.Items.FirstOrDefault(x => x.Id == relation.DiagramItemIdFrom);
                relation.DiagramItemTo = diagram.Items.FirstOrDefault(x => x.Id == relation.DiagramItemIdTo);
            }
            var action = new RelationAddAction(request.ActionId, diagram, relations);
            action.Do();
            _actionService.AddAction(diagram, action);

            return Ok();
        }

        [HttpPost]
        [Route("RelationEdit")]
        public IActionResult RelationEdit(RelationEditRequest request)
        {
            var response = new RelationEditResponse
            {
                Success = true,
                ClientId = request.ClientId,
                ActionId = request.ActionId,
                DiagramId = request.DiagramId,
                RelationOld = request.RelationOld,
                RelationNew = request.RelationNew
            };
            _mainNotifier.RelationEditResponse(response);
            var diagram = _diagramService.GetDiagramById(request.DiagramId);
            if (request.RelationOld != null)
            {
                request.RelationOld.DiagramItemFrom = diagram.Items.FirstOrDefault(x => x.Id == request.RelationOld.DiagramItemIdFrom);
                request.RelationOld.DiagramItemTo = diagram.Items.FirstOrDefault(x => x.Id == request.RelationOld.DiagramItemIdTo);
            }
            if (request.RelationNew != null)
            {
                request.RelationNew.DiagramItemFrom = diagram.Items.FirstOrDefault(x => x.Id == request.RelationNew.DiagramItemIdFrom);
                request.RelationNew.DiagramItemTo = diagram.Items.FirstOrDefault(x => x.Id == request.RelationNew.DiagramItemIdTo);
            }
            var action = new RelationEditAction(request.ActionId, diagram, request.RelationOld, request.RelationNew);
            action.Do();
            _actionService.AddAction(diagram, action);

            return Ok();
        }

        [HttpPost]
        [Route("RelationDelete")]
        public IActionResult RelationDelete(RelationDeleteRequest request)
        {
            var response = new RelationDeleteResponse
            {
                Success = true,
                ClientId = request.ClientId,
                ActionId = request.ActionId,
                DiagramId = request.DiagramId,
                RelationsId = request.RelationsId
            };
            _mainNotifier.RelationDeleteResponse(response);
            var diagram = _diagramService.GetDiagramById(request.DiagramId);
            var relations = diagram.Relations.Where(x => request.RelationsId.Contains(x.Id)).ToList();
            foreach (var relation in relations)
            {
                relation.DiagramItemFrom = diagram.Items.FirstOrDefault(x => x.Id == relation.DiagramItemIdFrom);
                relation.DiagramItemTo = diagram.Items.FirstOrDefault(x => x.Id == relation.DiagramItemIdTo);
            }
            var action = new RelationDeleteAction(request.ActionId, diagram, relations);
            action.Do();
            _actionService.AddAction(diagram, action);

            return Ok();
        }

        [HttpPost]
        [Route("ActionSetActive")]
        public IActionResult ActionSetActive(ActionSetActiveRequest request)
        {
            var response = new ActionSetActiveResponse
            {
                Success = true,
                ClientId = request.ClientId,
                ActionId = request.ActionId,
                DiagramId = request.DiagramId
            };
            _mainNotifier.ActionSetActiveResponse(response);
            var diagram = _diagramService.GetDiagramById(request.DiagramId);
            _actionService.SetActiveActionId(diagram, request.ActionId);

            return Ok();
        }
    }
}
