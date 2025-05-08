using Microsoft.EntityFrameworkCore;
using POS.Domain.Entities;
using POS.Infrastructure.Persistences.Contexts;
using POS.Infrastructure.Persistences.Interfaces;

namespace POS.Infrastructure.Persistences.Repositories
{
    public class SaleDetailRepository : ISaleDetailRepository
    {
        private readonly SaleWebContext _context;

        public SaleDetailRepository(SaleWebContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<SaleDetail>> GetSaleDetailBySaleId(int saleId)
        {
            var response = await _context.Products
                .AsNoTracking()
                .Join(_context.SaleDetails, p => p.Id, sd => sd.ProductId,
                (p, sd) => new { Product = p, SaleDetail = sd })
                .Where(sd => sd.SaleDetail.SaleId == saleId)
                .Select(sd => new SaleDetail
                {
                    ProductId = sd.Product.Id,
                    Product = new Product
                    {
                        Image = sd.Product.Image,
                        Code = sd.Product.Code,
                        Name = sd.Product.Name,
                    },
                    Quantity = sd.SaleDetail.Quantity,
                    UnitSalePrice = sd.SaleDetail.UnitSalePrice,
                    Total = sd.SaleDetail.Total
                })
                .ToListAsync();
            return response;
        }


        public IQueryable<Product> GetProductStockByWarehouseId(int warehouseId)
        {
            var products = _context.Products
                .Where(p => _context.ProductStocks
                .Any(ps =>ps.ProductId == p.Id && ps.WarehouseId == warehouseId && ps.CurrentStock > 0))
                .Select(p => new Product
                {
                    Id = p.Id,
                    Image = p.Image,
                    Code = p.Code,
                    Name = p.Name,
                    Category = new Category { Name = p.Category.Name },
                    UnitSalePrice = p.UnitSalePrice,
                    ProductStocks = new List<ProductStock>
                    {
                        new ProductStock
                        {
                            CurrentStock = _context.ProductStocks
                            .Where(ps =>ps.ProductId == p.Id && ps.WarehouseId == warehouseId && ps.CurrentStock > 0)
                            .Select(ps => ps.CurrentStock)
                            .FirstOrDefault(),
                        }
                    }
                }).AsQueryable();
            return products;
        }

    }
}
