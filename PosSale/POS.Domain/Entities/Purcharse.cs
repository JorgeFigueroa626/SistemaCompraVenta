namespace POS.Domain.Entities
{
    /// TABLA MADRE DE PurcharseDetail 
    public class Purcharse : BaseEntity
    {
        public string? Observation { get; set; }
        public decimal SubTotal { get; set; }
        public decimal Igv { get; set; }
        public decimal TotalAmount { get; set; }
        ///Relacion de MUCHOS a UNO
        public int WarehouseId { get; set; }
        public int ProviderId { get; set; }
        public virtual Warehouse Warehouse { get; set; } = null!;
        public virtual Provider? Provider { get; set; } = null!;
        //TABLA HIJA
        public virtual ICollection<PurcharseDetail> PurcharseDetails { get; set; } = null!;
    }
}
