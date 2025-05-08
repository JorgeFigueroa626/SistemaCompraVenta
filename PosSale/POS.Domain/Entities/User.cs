namespace POS.Domain.Entities
{
    public class User : BaseEntity
    {
        public string? UserName { get; set; }
        public string? Password { get; set; }
        public string? Email { get; set; }
        public string? Image { get; set; }
        public string? AuthType { get; set; }

        ///Relacion de MUCHOS a UNO
        public int RoleId { get; set; }
        public virtual Role Role { get; set; } = null!;
    }
}
