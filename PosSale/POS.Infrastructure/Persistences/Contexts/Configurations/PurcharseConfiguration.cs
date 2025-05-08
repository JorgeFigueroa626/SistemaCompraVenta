using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using POS.Domain.Entities;

namespace POS.Infrastructure.Persistences.Contexts.Configurations
{
    internal class PurcharseConfiguration : IEntityTypeConfiguration<Purcharse>
    {
        public void Configure(EntityTypeBuilder<Purcharse> builder)
        {
            builder.HasKey(c => c.Id);
            builder.Property(c => c.Id).HasColumnName("PurcharseId");

            builder.Property(c =>c.SubTotal).HasColumnType("decimal(10,2)");
            builder.Property(c =>c.Igv).HasColumnType("decimal(10,2)");
            builder.Property(c =>c.TotalAmount).HasColumnType("decimal(10,2)");
        }
    }
}
