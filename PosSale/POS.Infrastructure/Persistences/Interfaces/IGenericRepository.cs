using POS.Domain.Entities;
using System.Linq.Expressions;

namespace POS.Infrastructure.Persistences.Interfaces
{
    public interface IGenericRepository<T> where T : BaseEntity
    {
        Task<IEnumerable<T>> GetAllAsync();
        Task<IEnumerable<T>> GetSelectAsync();
        Task<T> GetByIdAsync(int id);
        Task<bool> RegisterAsync(T entity);
        Task<bool> EditAsync(T entity);
        Task<bool> RemoveAsync(int id);
        IQueryable<T> GetAllQueryable();
        IQueryable<T> GetEnityQuery(Expression<Func<T, bool>>? filter = null);
    }
}
