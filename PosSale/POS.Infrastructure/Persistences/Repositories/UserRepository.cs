using Microsoft.EntityFrameworkCore;
using POS.Domain.Entities;
using POS.Infrastructure.Persistences.Contexts;
using POS.Infrastructure.Persistences.Interfaces;

namespace POS.Infrastructure.Persistences.Repositories
{
    public class UserRepository : GenericRepository<User>, IUserRepository
    {
        private readonly SaleWebContext _context;

        public UserRepository(SaleWebContext context) : base(context)
        {
            _context = context;
        }

        public async Task<User> UserByEmail(string email)
        {
            var account = await _context.Users.AsNoTracking()
                .FirstOrDefaultAsync(u => u.Email!.Equals(email));
            return account!;
        }
    }
}
