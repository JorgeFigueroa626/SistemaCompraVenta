using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.Extensions.Configuration;
using POS.Domain.Entities;
using POS.Infrastructure.Persistences.Contexts;
using POS.Infrastructure.Persistences.Interfaces;
using System.Data;

namespace POS.Infrastructure.Persistences.Repositories
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly SaleWebContext _context;

        //PASO 2
        ///INTEGRACION DEL FLUJO DE LOS SEVICIOS GENERICOS PARA LAS ENTIADADES

        public IGenericRepository<Category> _category = null!;

        public IGenericRepository<Provider> _provider = null!;
        
        public IGenericRepository<DocumentType> _documentType = null!;

        public IUserRepository _user = null!; 

        public IGenericRepository<Warehouse> _warehouse = null!;

        public IGenericRepository<Product> _product = null!;

        public IProductStockRepository _productStock = null!;

        public IGenericRepository<Purcharse> _purcharse = null!;

        public IPurcharseDetailRepository _purcharseDetail = null!;

        public IGenericRepository<Client> _client = null!;

        public IGenericRepository<VoucherDocumentType> _voucherDocumentType = null!;

        public IGenericRepository<Sale> _sale = null!;

        public ISaleDetailRepository _saleDetail = null!;
        public UnitOfWork(SaleWebContext context, IConfiguration configuration)
        {
            _context = context;
            
        }

        public IGenericRepository<Category> Category => _category ?? new GenericRepository<Category>(_context);
        public IGenericRepository<Provider> Provider => _provider ?? new GenericRepository<Provider>(_context);
        public IGenericRepository<DocumentType> DocumentType => _documentType ?? new GenericRepository<DocumentType>(_context); 
        public IUserRepository User => _user ?? new UserRepository(_context);

        public IGenericRepository<Warehouse> Warehouse => _warehouse ?? new GenericRepository<Warehouse>(_context);

        public IGenericRepository<Product> Product => _product ?? new GenericRepository<Product>(_context);

        public IProductStockRepository ProductStock => _productStock ?? new ProductStockRepository(_context);

        public IGenericRepository<Purcharse> Purchases => _purcharse ?? new GenericRepository<Purcharse>(_context);

        public IPurcharseDetailRepository PurchasesDetail => _purcharseDetail ?? new PurcharseDetailRepository(_context);

        public IGenericRepository<Client> Client => _client ?? new GenericRepository<Client>(_context);

        public IGenericRepository<VoucherDocumentType> VoucherDocumentType => _voucherDocumentType ?? new GenericRepository<VoucherDocumentType>(_context);

        public IGenericRepository<Sale> Sale => _sale ?? new GenericRepository<Sale>(_context);

        public ISaleDetailRepository SaleDetail => _saleDetail ?? new SaleDetailRepository(_context);

        public IDbTransaction BeginTransaction()
        {
            var transaction = _context.Database.BeginTransaction();
            return transaction.GetDbTransaction();
        }

        public void Dispose()
        {
            _context.Dispose();
        }

        public void SaveChanges()
        {
            _context.SaveChanges();
        }

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}
