using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Configurations;

public class ExternalTransferLogConfiguration : IEntityTypeConfiguration<ExternalTransferLog>
{
    public void Configure(EntityTypeBuilder<ExternalTransferLog> builder)
    {
        builder.HasKey(e => e.Id);

        builder.Property(e => e.ToIban)
            .IsRequired()
            .HasMaxLength(26);

        builder.Property(e => e.Amount)
            .HasColumnType("decimal(18,2)")
            .IsRequired();

        builder.Property(e => e.Status)
            .IsRequired()
            .HasMaxLength(20);

        builder.Property(e => e.CreatedAt)
            .IsRequired();

        builder.HasOne(e => e.FromAccount)
            .WithMany()
            .HasForeignKey(e => e.FromAccountId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}