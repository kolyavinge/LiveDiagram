using System.Linq;
using LiveDiagram.Api.Actions;
using LiveDiagram.Api.Contracts.RequestResponse;
using LiveDiagram.Api.DataAccess;
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
        private readonly IDBContext _dbContext;
        private readonly IDiagramService _diagramService;
        private readonly IActionService _actionService;
        private readonly IMainNotifier _mainNotifier;
        private readonly ILogger<ApiController> _logger;

        public ApiController(IDBContext dbContext, IDiagramService diagramService, IActionService actionService, IMainNotifier mainNotifier, ILogger<ApiController> logger)
        {
            _dbContext = dbContext;
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
            var response = new GetAvailableDiagramsResponse { Success = true };
            if (request.CountOnly)
            {
                var param = new GetAvailableDiagramsCountParams { FilterTitle = request.FilterTitle };
                response.Count = _diagramService.GetAvailableDiagramsCount(param);
            }
            else
            {
                var param = new GetAvailableDiagramsParams { IncludeThumbnails = request.IncludeThumbnails, FilterTitle = request.FilterTitle, Batch = request.Batch };
                var availableDiagrams = _diagramService
                    .GetAvailableDiagrams(param)
                    .ToList();
                response.Count = availableDiagrams.Count;
                response.AvailableDiagrams = availableDiagrams;
            }

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
        [Route("CreateDiagram")]
        public IActionResult CreateDiagram(CreateDiagramRequest request)
        {
            var response = new CreateDiagramResponse
            {
                Success = true,
                ClientId = request.ClientId,
                DiagramId = request.DiagramId
            };
            _diagramService.CreateDiagram(request.DiagramId);

            return new JsonResult(response);
        }

        [HttpPost]
        [Route("SaveDiagram")]
        public IActionResult SaveDiagram(SaveDiagramRequest request)
        {
            var response = new SaveDiagramResponse
            {
                Success = true,
                ClientId = request.ClientId,
                DiagramId = request.Diagram.Id
            };
            _mainNotifier.SaveDiagramResponse(response);
            _diagramService.SaveDiagram(request.Diagram);

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
            _diagramService.SetTitle(diagram, request.DiagramTitle);
            var action = new DiagramSetTitleAction(request.ActionId, request);
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
            var action = new DiagramLayoutAction(request.ActionId, request);
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
                Items = request.Items
            };
            _mainNotifier.DiagramItemMoveResponse(response);
            var diagram = _diagramService.GetDiagramById(request.DiagramId);
            var action = new DiagramItemMoveAction(request.ActionId, request);
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
                Items = request.Items
            };
            _mainNotifier.DiagramItemResizeResponse(response);
            var diagram = _diagramService.GetDiagramById(request.DiagramId);
            var action = new DiagramItemResizeAction(request.ActionId, request);
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
            var action = new DiagramItemSetTitleAction(request.ActionId, request);
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
            var action = new DiagramItemAddAction(request.ActionId, request);
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
            var action = new DiagramItemEditAction(request.ActionId, request);
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
            var action = new DiagramItemDeleteAction(request.ActionId, request);
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
            var action = new RelationAddAction(request.ActionId, request);
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
            var action = new RelationEditAction(request.ActionId, request);
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
            var action = new RelationDeleteAction(request.ActionId, request);
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
