using Microsoft.EntityFrameworkCore;
using POS.Domain.Entities;
using POS.Infrastructure.Persistences.Contexts;
using POS.Infrastructure.Persistences.Interfaces;

namespace POS.Infrastructure.Persistences.Repositories
{
    public class ProductStockRepository : IProductStockRepository
    {
        private readonly SaleWebContext _context;

        public ProductStockRepository(SaleWebContext context)
        {
            _context = context;
        }

        ///CONSUÑTA O METODO PARA GUARDAR LA CANTIDAD DE PRODUCTOS, EN LA TABLA HIJA PRODUCTSTOCK
        public async Task<bool> RegisterProductStock(ProductStock productStock)
        {
            await _context.AddAsync(productStock);
            var recordsAfftected = await _context.SaveChangesAsync();
            return recordsAfftected > 0;
        }
        
        ///CONSULTA PARA RETORNAR LOS DETALLES DE LAS COMPRAS
        public async Task<IEnumerable<ProductStock>> GetProductStockByWarehouse(int productId)
        {
            return await _context.ProductStocks
                .AsNoTracking()
                .Join(_context.Warehouses, ps => ps.WarehouseId, w => w.Id,  //relaciona mi tabla
                (ps, w) => new { ProductStock = ps, Warehouse = w })
                .Where(ps => ps.ProductStock.ProductId == productId)  //filtro por productId
                .OrderBy(w => w.Warehouse.Id)
                .Select(ps => new ProductStock   //seleciona los datos para retornar
                {
                    Warehouse = new Warehouse { Name = ps.Warehouse.Name },
                    CurrentStock = ps.ProductStock.CurrentStock,
                    PurchasePrice = ps.ProductStock.PurchasePrice
                })
                .ToArrayAsync();
        }

        ///CONSULTA O METODO PARA EXTRAER EL STOCK DE LA TABLA PRODUCTSTOCK, POR PRODUCTID Y WAREHOUSEID
        public async Task<ProductStock> GetProductStockByProductId(int productId, int warehouseId)
        {
            var response = await _context.ProductStocks
                .AsNoTracking()
                .FirstOrDefaultAsync(ps => ps.ProductId == productId && ps.WarehouseId == warehouseId);
            
            return response!;
        }

        //CONSULTA PARA ACTUALIZAR EL STOCK(AUMENTAR-DESMINUIR) DEL PRODUCTSTOCK, POR CADA COMPRA
        public async Task<bool> UpdateCurrentStockByProducts(ProductStock productStock)
        {
            _context.Update(productStock);
            var recordsAffeted = await _context.SaveChangesAsync();
            return recordsAffeted > 0;
        }
    }
}
