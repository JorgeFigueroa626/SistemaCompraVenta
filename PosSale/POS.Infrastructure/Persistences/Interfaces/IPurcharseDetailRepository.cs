using POS.Domain.Entities;

namespace POS.Infrastructure.Persistences.Interfaces
{
    public interface IPurcharseDetailRepository
    {
        //METODOS DE LISTA DE DETALLES DE LA COMPRA
        Task<IEnumerable<PurcharseDetail>> GetPurcharseDetailByPurcharseId(int purcharseId);
    }
}
