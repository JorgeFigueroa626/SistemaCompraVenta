﻿using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using POS.Domain.Entities;

namespace POS.Infrastructure.Persistences.Contexts.Configurations
{
    public class ProductStockConfiguration : IEntityTypeConfiguration<ProductStock>
    {
        public void Configure(EntityTypeBuilder<ProductStock> builder)
        {
            builder.HasKey(ps => new { ps.ProductId, ps.WarehouseId });

            builder.Property(ps => ps.PurchasePrice)
                .HasPrecision(precision: 10, scale: 2);
        }
    }
}
