namespace POS.Domain.Entities
{
    /// TABLA MADRE DE PRODUCTSTOCK
    public class Product : BaseEntity
    {
        public string? Code { get; set; }
        public string? Name { get; set; }
        public int StockMin { get; set; }
        public int StockMax { get; set; }
        public string? Image { get; set; }
        public decimal UnitSalePrice { get; set; }
        ///Relacion de MUCHOS a UNO
        public int CategoryId { get; set; }
        public virtual Category Category { get; set; } = null!;
        //TABLA HIJA
        public virtual ICollection<ProductStock> ProductStocks { get; set; } = null!;

    }
}
