using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LiveDiagram.Api.SignalR
{
    public class ReponseContainer
    {
        public string ClientId { get; set; }

        public string DiagramId { get; set; }

        public object Response { get; set; }
    }
}
