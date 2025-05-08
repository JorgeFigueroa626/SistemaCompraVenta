namespace POS.Domain.Entities
{
    public class Role : BaseEntity
    {
        public string? Name { get; set; }

        ///Relacion de UNO a MUCHOS
        //public virtual ICollection<User> Users { get; set; } = null!;

    }
}
