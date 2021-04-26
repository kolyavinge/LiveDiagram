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
            var callbackMethodName = response.GetType().Name;
            var reponseContainer = new ReponseContainer { ClientId = response.ClientId, DiagramId = response.DiagramId, Response = response };
            var reponseContainerSerialized = JsonSerializer.Serialize(reponseContainer);
            await _hubConnection.InvokeAsync(callbackMethodName, reponseContainerSerialized);
        }

        public async void DiagramItemResizeResponse(DiagramItemResizeResponse response)
        {
            var callbackMethodName = response.GetType().Name;
            var reponseContainer = new ReponseContainer { ClientId = response.ClientId, DiagramId = response.DiagramId, Response = response };
            var reponseContainerSerialized = JsonSerializer.Serialize(reponseContainer);
            await _hubConnection.InvokeAsync(callbackMethodName, reponseContainerSerialized);
        }

        //private async void SendResponse()
        //{

        //}
    }
}
