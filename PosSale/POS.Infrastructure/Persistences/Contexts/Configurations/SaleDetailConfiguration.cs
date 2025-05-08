using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using POS.Domain.Entities;

namespace POS.Infrastructure.Persistences.Contexts.Configurations
{
    public class SaleDetailConfiguration : IEntityTypeConfiguration<SaleDetail>
    {
        public void Configure(EntityTypeBuilder<SaleDetail> builder)
        {
            builder.HasKey(sd => new { sd.SaleId, sd.ProductId });
            builder.Property(e => e.UnitSalePrice).HasColumnType("decimal(10,2)");
            builder.Property(e => e.Total).HasColumnType("decimal(10,2)");

        }
    }
}
