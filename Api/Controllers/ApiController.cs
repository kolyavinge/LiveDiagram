using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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
                DiagramId = request.DiagramId,
                DiagramItemId = request.DiagramItemId,
                DiagramItemTitle = request.DiagramItemTitle,
                DiagramItemX = request.DiagramItemX,
                DiagramItemY = request.DiagramItemY,
                DiagramItemWidth = request.DiagramItemWidth,
                DiagramItemHeight = request.DiagramItemHeight
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
                DiagramId = request.DiagramId,
                DiagramItemId = request.DiagramItemId
            };
            _mainNotifier.DiagramItemDeleteResponse(response);

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
                DiagramId = request.DiagramId,
                RelationsId = request.RelationsId
            };
            _mainNotifier.RelationDeleteResponse(response);

            return Ok();
        }
    }
}
