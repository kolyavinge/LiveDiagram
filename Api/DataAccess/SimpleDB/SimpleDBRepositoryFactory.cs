using SimpleDB;

namespace LiveDiagram.Api.DataAccess.SimpleDB
{
    class SimpleDBRepositoryFactory : RepositoryFactory
    {
        public SimpleDBRepositoryFactory(IDBEngine engine)
        {
            Add<IDiagramRepository>(new SimpleDBDiagramRepository { Engine = engine });
            Add<IDiagramThumbnailRepository>(new SimpleDBDiagramThumbnailRepository { Engine = engine });
            Add<IDiagramMetaRepository>(new SimpleDBDiagramMetaRepository { Engine = engine });
        }
    }
}
