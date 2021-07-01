using System;
using System.Collections.Generic;

namespace LiveDiagram.Api.DataAccess
{
    public class RepositoryFactory : IRepositoryFactory
    {
        private readonly Dictionary<Type, IRepository> _repositories;

        public RepositoryFactory()
        {
            _repositories = new Dictionary<Type, IRepository>();
        }

        public TRepository Get<TRepository>() where TRepository : IRepository
        {
            if (_repositories.ContainsKey(typeof(TRepository)))
            {
                return (TRepository)_repositories[typeof(TRepository)];
            }
            else
            {
                throw new InvalidOperationException();
            }
        }

        protected void Add<TRepository>(IRepository repository) where TRepository : IRepository
        {
            _repositories.Add(typeof(TRepository), repository);
        }
    }
}
