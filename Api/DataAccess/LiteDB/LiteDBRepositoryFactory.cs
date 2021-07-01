namespace LiveDiagram.Api.DataAccess.LiteDB
{
    public class LiteDBRepositoryFactory : RepositoryFactory
    {
        private string _databaseFilePath;

        public LiteDBRepositoryFactory(string databaseFilePath)
        {
            _databaseFilePath = databaseFilePath;
            Add<IDiagramRepository>(new LiteDBDiagramRepository(_databaseFilePath));
        }
    }
}
