namespace LiveDiagram.Api.DataAccess.LiteDB
{
    class LiteDBRepositoryFactory : RepositoryFactory
    {
        public LiteDBRepositoryFactory(DatabaseFile databaseFile)
        {
            Add<IDiagramRepository>(new LiteDBDiagramRepository { DatabaseFile = databaseFile });
        }
    }
}
