﻿using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using POS.Domain.Entities;

namespace POS.Infrastructure.Persistences.Contexts.Configurations
{
    public class DocumentTypeConfiguration : IEntityTypeConfiguration<DocumentType>
    {
        public void Configure(EntityTypeBuilder<DocumentType> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Id).HasColumnName("DocumentTypeId");

            builder.Property(e => e.Abbreviation)
                   .HasMaxLength(10)
                   .IsUnicode(false);

            builder.Property(e => e.Code)
                .HasMaxLength(10)
                .IsUnicode(false);

            builder.Property(e => e.Name)
                .HasMaxLength(100)
                .IsUnicode(false);
        }
    }
}
