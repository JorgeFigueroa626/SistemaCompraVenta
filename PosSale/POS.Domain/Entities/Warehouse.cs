namespace POS.Domain.Entities
{
    /// TABLA PADRE DE PRODUCTSTOCK
    public class Warehouse : BaseEntity
    {
        public string? Name { get; set; }
        //TABLA HIJA
        public virtual ICollection<ProductStock> ProductStocks { get; set; } = null!;
    }
}
