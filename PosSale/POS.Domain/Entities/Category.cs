namespace POS.Domain.Entities
{

    /// NO # 1
    public partial class Category : BaseEntity
    {
       
        public string? Name { get; set; }
        public string? Description { get; set; }
        ///Relacion de UNO a MUCHOS
        public virtual ICollection<Product> Products { get; set; } = null!;

    }
}
