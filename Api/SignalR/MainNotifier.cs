using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using LiveDiagram.Api.Contracts;
using Microsoft.AspNetCore.SignalR.Client;

namespace LiveDiagram.Api.SignalR
{
    public interface IMainNotifier
    {
        void Start();
        void DiagramItemMoveResponse(DiagramItemMoveResponse response);
        void DiagramItemResizeResponse(DiagramItemResizeResponse response);
        void DiagramItemSetTitleResponse(DiagramItemSetTitleResponse response);
    }

    public class MainNotifier : IMainNotifier
    {
        private HubConnection _hubConnection;

        public async void Start()
        {
            _hubConnection = new HubConnectionBuilder().WithUrl("https://localhost:44305/hub").Build();
            await _hubConnection.StartAsync();
        }

        public async void DiagramItemMoveResponse(DiagramItemMoveResponse response)
        {
            await SendResponse(response);
        }

        public async void DiagramItemResizeResponse(DiagramItemResizeResponse response)
        {
            await SendResponse(response);
        }

        public async void DiagramItemSetTitleResponse(DiagramItemSetTitleResponse response)
        {
            await SendResponse(response);
        }

        private async Task SendResponse(DiagramItemResponse response)
        {
            var callbackMethodName = response.GetType().Name;
            var reponseContainer = new ReponseContainer { ClientId = response.ClientId, DiagramId = response.DiagramId, Response = response };
            var reponseContainerSerialized = JsonSerializer.Serialize(reponseContainer);
            await _hubConnection.InvokeAsync(callbackMethodName, reponseContainerSerialized);
        }
    }
}
