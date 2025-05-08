using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using POS.Domain.Entities;

namespace POS.Infrastructure.Persistences.Contexts.Configurations
{
    /// NO # 2
    public class CategoryConfiguration : IEntityTypeConfiguration<Category>
    {
        public void Configure(EntityTypeBuilder<Category> builder)
        {
            //HEREDAMOS DE LA CLASE BASEENTITY
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Id).HasColumnName("CategoryId");

            builder.Property(e => e.Description)
                .HasMaxLength(100)
                .IsUnicode(false);

            builder.Property(e => e.Name)
                .HasMaxLength(100)
                .IsUnicode(false);

        }
    }
}
