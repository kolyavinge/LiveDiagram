using LiveDiagram.Api.Contracts;
using LiveDiagram.Api.Model;
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
        private readonly IMainNotifier _mainNotifier;
        private readonly ILogger<ApiController> _logger;

        public ApiController(IMainNotifier mainNotifier, ILogger<ApiController> logger)
        {
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
            var diagramLoader = new DiagramLoader();
            var response = new GetAvailableDiagramsResponse
            {
                Success = true,
                AvailableDiagrams = diagramLoader.GetAvailableDiagrams()
            };

            return new JsonResult(response);
        }

        [HttpPost]
        [Route("GetDiagramById")]
        public IActionResult GetDiagramById(GetDiagramByIdRequest request)
        {
            var diagramLoader = new DiagramLoader();
            var response = new GetDiagramByIdResponse
            {
                Success = true,
                Diagram = diagramLoader.LoadDiagramById(request.DiagramId)
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
                DiagramId = request.DiagramId,
                DiagramTitle = request.DiagramTitle
            };
            _mainNotifier.DiagramSetTitleResponse(response);

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
                DiagramId = request.DiagramId,
                Items = request.Items
            };
            _mainNotifier.DiagramLayoutResponse(response);

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
                DiagramId = request.DiagramId,
                DiagramItemId = request.DiagramItemId,
                DiagramItemX = request.DiagramItemX,
                DiagramItemY = request.DiagramItemY
            };
            _mainNotifier.DiagramItemMoveResponse(response);

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
                DiagramId = request.DiagramId,
                DiagramItemId = request.DiagramItemId,
                DiagramItemX = request.DiagramItemX,
                DiagramItemY = request.DiagramItemY,
                DiagramItemWidth = request.DiagramItemWidth,
                DiagramItemHeight = request.DiagramItemHeight
            };
            _mainNotifier.DiagramItemResizeResponse(response);

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
                DiagramId = request.DiagramId,
                DiagramItemId = request.DiagramItemId,
                DiagramItemTitle = request.DiagramItemTitle
            };
            _mainNotifier.DiagramItemSetTitleResponse(response);

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
                DiagramItemId = request.DiagramItemId,
                DiagramItemTitle = request.DiagramItemTitle,
                DiagramItemX = request.DiagramItemX,
                DiagramItemY = request.DiagramItemY,
                DiagramItemWidth = request.DiagramItemWidth,
                DiagramItemHeight = request.DiagramItemHeight,
                ParentRelation = request.ParentRelation,
                Methods = request.Methods
            };
            _mainNotifier.DiagramItemAddResponse(response);

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

            return Ok();
        }
    }
}
