using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace LiveDiagram.Api.SignalR
{
    public class MainHub : Hub
    {
        private static List<RegisterDataConnection> _connections = new List<RegisterDataConnection>();

        public void Register(object registerDataObject)
        {
            lock (_connections)
            {
                var registerData = JsonSerializer.Deserialize<RegisterData>(registerDataObject.ToString());
                _connections.RemoveAll(x => x.RegisterData.Equals(registerData));
                _connections.Add(new RegisterDataConnection { RegisterData = registerData, Connection = Context.ConnectionId });
            }
        }

        public override Task OnDisconnectedAsync(Exception exception)
        {
            lock (_connections)
            {
                _connections.RemoveAll(x => x.Connection == Context.ConnectionId);
            }
            return base.OnDisconnectedAsync(exception);
        }

        public async Task DiagramSetTitleResponse(object responseContainerJson)
        {
            await SendAsync("DiagramSetTitleResponse", responseContainerJson);
        }

        public async Task DiagramItemMoveResponse(object responseContainerJson)
        {
            await SendAsync("DiagramItemMoveResponse", responseContainerJson);
        }

        public async Task DiagramItemResizeResponse(object responseContainerJson)
        {
            await SendAsync("DiagramItemResizeResponse", responseContainerJson);
        }

        public async Task DiagramItemSetTitleResponse(object responseContainerJson)
        {
            await SendAsync("DiagramItemSetTitleResponse", responseContainerJson);
        }

        public async Task DiagramItemAddResponse(object responseContainerJson)
        {
            await SendAsync("DiagramItemAddResponse", responseContainerJson);
        }

        public async Task DiagramItemDeleteResponse(object responseContainerJson)
        {
            await SendAsync("DiagramItemDeleteResponse", responseContainerJson);
        }

        public async Task DiagramItemSetMethodsResponse(object responseContainerJson)
        {
            await SendAsync("DiagramItemSetMethodsResponse", responseContainerJson);
        }

        public async Task DiagramLayoutResponse(object responseContainerJson)
        {
            await SendAsync("DiagramLayoutResponse", responseContainerJson);
        }

        public async Task RelationAddResponse(object responseContainerJson)
        {
            await SendAsync("RelationAddResponse", responseContainerJson);
        }

        public async Task RelationDeleteResponse(object responseContainerJson)
        {
            await SendAsync("RelationDeleteResponse", responseContainerJson);
        }

        private async Task SendAsync(string methodName, object responseContainerJson)
        {
            List<string> connectionsId;
            ReponseContainer responseContainer;
            lock (_connections)
            {
                responseContainer = JsonSerializer.Deserialize<ReponseContainer>(responseContainerJson.ToString());
                connectionsId = GetConnectionsId(responseContainer.DiagramId);
            }
            if (connectionsId.Any())
            {
                await Clients.Clients(connectionsId).SendAsync(methodName, responseContainer.Response);
            }
        }

        private List<string> GetConnectionsId(string diagramId)
        {
            return _connections.Where(x => x.RegisterData.DiagramId == diagramId).Select(x => x.Connection).ToList();
        }
    }
}
