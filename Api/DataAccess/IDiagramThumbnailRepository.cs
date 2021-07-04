using System.Collections.Generic;
using LiveDiagram.Api.Contracts.Common;

namespace LiveDiagram.Api.DataAccess
{
    public interface IDiagramThumbnailRepository : IRepository
    {
        List<DiagramThumbnail> Get(IEnumerable<AvailableDiagram> diagrams);

        void Save(DiagramThumbnail thumbnail);
    }
}
