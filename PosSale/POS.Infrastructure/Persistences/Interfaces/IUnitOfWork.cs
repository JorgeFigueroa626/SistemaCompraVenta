using POS.Domain.Entities;
using System.Data;

namespace POS.Infrastructure.Persistences.Interfaces
{
    public interface IUnitOfWork : IDisposable
    {
        //PASO 2
        //DECLARACION DE LOS METODOS GENERICOS PARA LAS ENTIDAD
        //TAMBIEN PUEDED DECLARAR METODOS ESPECIFICOS PARA CADA ENTIDADD
        IGenericRepository<Category> Category { get; }
        IGenericRepository<Provider> Provider { get; }
        IGenericRepository<DocumentType> DocumentType { get; }
        IGenericRepository<Warehouse> Warehouse { get; }
        IGenericRepository<Product> Product { get;}
        IUserRepository User { get; }
        IProductStockRepository ProductStock { get; }
        IGenericRepository<Purcharse> Purchases { get; }
        IPurcharseDetailRepository PurchasesDetail { get; }
        IGenericRepository<Client> Client { get; }
        IGenericRepository<VoucherDocumentType> VoucherDocumentType { get; }
        IGenericRepository<Sale> Sale { get; }
        ISaleDetailRepository SaleDetail { get; }

        void SaveChanges();
        Task SaveChangesAsync();
        IDbTransaction BeginTransaction();  //VERIFICA EL REGISTRO CORECTAMENTE DE UNA ENTIDAD
    }
}
