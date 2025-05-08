using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using POS.Domain.Entities;

namespace POS.Infrastructure.Persistences.Contexts.Configurations
{
    public class ProductConfiguration : IEntityTypeConfiguration<Product>
    {
        public void Configure(EntityTypeBuilder<Product> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Id).HasColumnName("ProductId");

            builder.Property(p => p.Name).HasMaxLength(100);
            builder.Property(p => p.Image).HasMaxLength(1000);
            builder.Property(p => p.UnitSalePrice).HasColumnType("decimal(10,2)");

            builder.HasOne(p => p.Category)
                    .WithMany(d => d.Products)
                    .HasForeignKey(p => p.CategoryId)
                    .OnDelete(DeleteBehavior.ClientSetNull);
        }
    }
}
