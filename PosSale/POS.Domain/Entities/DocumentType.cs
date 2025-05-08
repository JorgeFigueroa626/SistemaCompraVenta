namespace POS.Domain.Entities
{
    public partial class DocumentType : BaseEntity
    {
        public string? Code { get; set; }
        public string? Name { get; set; }
        public string? Abbreviation { get; set; }
        ///Relacion de UNO a MUCHOS  (Relacion OPCIONAL a Agregar)
        public virtual ICollection<Client> Clients { get; set; } = null!;
        public virtual ICollection<Provider> Providers { get; set; } = null!;
    }
}
