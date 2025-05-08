using Microsoft.EntityFrameworkCore;
using POS.Domain.Entities;
using POS.Infrastructure.Persistences.Contexts;
using POS.Infrastructure.Persistences.Interfaces;

namespace POS.Infrastructure.Persistences.Repositories
{
    public class PurcharseDetailRepository : IPurcharseDetailRepository
    {
        private readonly SaleWebContext _context;

        public PurcharseDetailRepository(SaleWebContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<PurcharseDetail>> GetPurcharseDetailByPurcharseId(int purcharseId)
        {
            var response = await _context.Products                              //inicializamos la consulta
                .AsNoTracking()                                                 //resultados no restreados
                .Join(_context.PurcharseDetail, c => c.Id, cd => cd.ProductId,  //relacionadmos producto y purcharseDetail
                (c, cd) => new { Product = c, PurcharseDetail = cd })           //creamos un alias
                .Where(c => c.PurcharseDetail.PurcharseId == purcharseId)       //filtramos por Id
                .Select(cd => new PurcharseDetail           //Datos solicitado que devuelva
                {
                    ProductId = cd.Product.Id,
                    Product = new Product
                    {
                        Image = cd.Product.Image,
                        Code = cd.Product.Code,
                        Name = cd.Product.Name
                    },
                    Quantity = cd.PurcharseDetail.Quantity,
                    UnitPurcharsePrice = cd.PurcharseDetail.UnitPurcharsePrice,
                    Total = cd.PurcharseDetail.Total
                })
                .ToListAsync();
            return response;
        }
    }
}
