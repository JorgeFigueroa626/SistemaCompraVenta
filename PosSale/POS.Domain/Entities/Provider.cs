namespace POS.Domain.Entities
{
    public partial class Provider : BaseEntity
    {
        public string Name { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string DocumentNumber { get; set; } = null!;
        public string? Address { get; set; }
        public string Phone { get; set; } = null!;
        ///Relacion de MUCHOS a UNO
        public int DocumentTypeId { get; set; }
        public virtual DocumentType DocumentType { get; set; } = null!;
    }
}
