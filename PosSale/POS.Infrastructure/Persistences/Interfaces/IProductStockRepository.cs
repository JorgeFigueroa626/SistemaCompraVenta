using POS.Domain.Entities;

namespace POS.Infrastructure.Persistences.Interfaces
{
    public interface IProductStockRepository
    {
        //CONSULTAS PARA LA BASE DE DATOS - ENTIDADES DETAIL
        Task<bool> RegisterProductStock(ProductStock productStock);
        Task<IEnumerable<ProductStock>> GetProductStockByWarehouse(int productId);
        Task<ProductStock> GetProductStockByProductId(int productId, int warehouseId);
        Task<bool> UpdateCurrentStockByProducts(ProductStock productStock);
    }
}
