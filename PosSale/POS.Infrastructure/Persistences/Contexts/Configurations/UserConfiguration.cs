using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using POS.Domain.Entities;

namespace POS.Infrastructure.Persistences.Contexts.Configurations
{
    public class UserConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.HasKey(x => x.Id);

            builder.Property(u => u.Id).HasColumnName("UserId");

            builder.Property(u => u.Email).IsUnicode(false);
            builder.Property(u => u.Image).IsUnicode(false);
            builder.Property(u => u.Password).IsUnicode(false);
            builder.Property(u => u.UserName).HasMaxLength(50).IsUnicode(false);
            builder.Property(u => u.AuthType).HasMaxLength(10).IsUnicode(false);

            /*builder.HasOne(p => p.Role)
                    .WithMany(d => d.Users)
                    .HasForeignKey(p => p.RoleId)
                    .OnDelete(DeleteBehavior.ClientSetNull);*/

        }
    }
}
