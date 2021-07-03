using LiteDB;

namespace LiveDiagram.Api.DataAccess.LiteDB
{
    class DatabaseFile
    {
        private string _databaseFilePath;

        public DatabaseFile(string databaseFilePath)
        {
            _databaseFilePath = databaseFilePath;
        }

        public LiteDatabase Open()
        {
            return new LiteDatabase(_databaseFilePath);
        }
    }
}
