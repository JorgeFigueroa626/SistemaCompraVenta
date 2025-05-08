using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using POS.Domain.Entities;

namespace POS.Infrastructure.Persistences.Contexts.Configurations
{
    public class PurcharseDetailConfiguration : IEntityTypeConfiguration<PurcharseDetail>
    {
        public void Configure(EntityTypeBuilder<PurcharseDetail> builder)
        {
            builder.HasKey(pd => new { pd.PurcharseId, pd.ProductId });

            builder.Property(pd =>pd.UnitPurcharsePrice).HasColumnType("decimal(10,2)");
            builder.Property(pd =>pd.Total).HasColumnType("decimal(10,2)");
        }
    }
}
