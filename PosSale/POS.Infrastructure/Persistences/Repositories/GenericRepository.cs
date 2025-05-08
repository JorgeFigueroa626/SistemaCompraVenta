using Microsoft.EntityFrameworkCore;
using POS.Domain.Entities;
using POS.Infrastructure.Persistences.Contexts;
using POS.Infrastructure.Persistences.Interfaces;
using POS.Utilities.Static;
using System.Linq.Dynamic.Core;
using System.Linq.Expressions;

namespace POS.Infrastructure.Persistences.Repositories
{
    public class GenericRepository<T> : IGenericRepository<T> where T : BaseEntity
    {
        private readonly SaleWebContext _context;
        private DbSet<T> _entity;

        /// CREACION DE LOS SERVICIOS GENERICOS
        public GenericRepository(SaleWebContext context)
        {
            _context = context;
            _entity = _context.Set<T>();
        }

        public async Task<IEnumerable<T>> GetAllAsync()
        {
            var getAll = await _entity.Where(x => x.State.Equals((int)StateTypes.ACTIVE) 
                         && x.AuditDeleteUser == null && x.AuditDeleteDate == null).AsNoTracking().ToListAsync();
            return getAll;
        }

        public async Task<IEnumerable<T>> GetSelectAsync()
        {
            var getSelect = await _entity.Where(x=>x.State.Equals((int)StateTypes.ACTIVE) &&
                            x.AuditDeleteUser == null && x.AuditDeleteDate == null).AsNoTracking().ToListAsync();
            return getSelect;
        }

        public async Task<T> GetByIdAsync(int id)
        {
            var getId = await _entity.AsNoTracking().FirstOrDefaultAsync(x => x.Id.Equals(id));
            return getId!;
        }
        public async Task<bool> RegisterAsync(T entity)
        {
            entity.AuditCreateUser = 1;
            entity.AuditCreateDate = DateTime.Now;

            await _context.AddAsync(entity);
            var recordsAffected = await _context.SaveChangesAsync();
            return recordsAffected > 0;
        }

        public async Task<bool> EditAsync(T entity)
        {
            entity.AuditUpdateUser = 1;
            entity.AuditUpdateDate = DateTime.Now;

            _context.Update(entity);

            _context.Entry(entity).Property(e => e.AuditCreateUser).IsModified = false;
            _context.Entry(entity).Property(e => e.AuditCreateDate).IsModified = false;

            var recordsAffected = await _context.SaveChangesAsync();
            return recordsAffected > 0;
        }

        public async Task<bool> RemoveAsync(int id)
        {
            T entityId = await GetByIdAsync(id);
            entityId!.AuditDeleteUser = 1;
            entityId.AuditDeleteDate = DateTime.Now;
            entityId.State = 0;

            _context.Update(entityId);

            var recordAffected = await _context.SaveChangesAsync();
            return recordAffected > 0;
        }

        public IQueryable<T> GetAllQueryable()
        {
            var getAllQuery = GetEnityQuery(e => e.AuditDeleteUser == null && e.AuditDeleteDate == null);
            return getAllQuery;
        }

        public IQueryable<T> GetEnityQuery(Expression<Func<T, bool>>? filter = null)
        {
            IQueryable<T> query = _entity;
            if (filter != null) query = query.Where(filter);
            
            return query;
        }


        

        
    }
}
