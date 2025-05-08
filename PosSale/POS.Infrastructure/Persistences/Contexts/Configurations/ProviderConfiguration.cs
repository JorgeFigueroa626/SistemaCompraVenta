using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using POS.Domain.Entities;

namespace POS.Infrastructure.Persistences.Contexts.Configurations
{
    public class ProviderConfiguration : IEntityTypeConfiguration<Provider>
    {
        public void Configure(EntityTypeBuilder<Provider> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Id).HasColumnName("ProviderId");

            builder.Property(p =>p.DocumentNumber).HasMaxLength(50).IsUnicode(false);
            builder.Property(p => p.Email).HasMaxLength(50).IsUnicode(false);
            builder.Property(p => p.Phone).HasMaxLength(15).IsUnicode(false);

            builder.HasOne(p => p.DocumentType)
                    .WithMany(d => d.Providers)
                    .HasForeignKey(p => p.DocumentTypeId)
                    .OnDelete(DeleteBehavior.ClientSetNull);

        }
    }
}
