using Microsoft.EntityFrameworkCore;
using POS.Domain.Entities;
using System.Reflection;

namespace POS.Infrastructure.Persistences.Contexts
{
    public partial class SaleWebContext : DbContext
    {
        public SaleWebContext()
        {
        }

        public SaleWebContext(DbContextOptions<SaleWebContext> options)
            : base(options)
        {
        }
        /// NO # 3
        //SE SETEA AUTOMATICAMENTE LAS ENTIDADES POR CADA MIGRACION DE CADA TABLA QUE CREA.
        //O PODES CREAR MANUAL MENTE => (ROCEMENDABLE) 
        // ES RENOMBRER A LA ENTIDAD PRODUCT => PRODUCTS
        public virtual DbSet<Category> Categories { get; set; } = null!;
        public virtual DbSet<DocumentType> DocumentTypes { get; set; } = null!;

        public virtual DbSet<Role> Roles { get; set; } = null!;
        public virtual DbSet<User> Users { get; set; } = null!;
        public virtual DbSet<Warehouse> Warehouses { get; set; } = null!;
        public virtual DbSet<Product> Products { get; set; } = null!;
        public virtual DbSet<ProductStock> ProductStocks { get; set; } = null!;
        
        public virtual DbSet<Purcharse> Purcharse { get; set; } = null!;
        public virtual DbSet<PurcharseDetail> PurcharseDetail { get; set; } = null!;
        public virtual DbSet<Client> Client { get; set; }
        public virtual DbSet<VoucherDocumentType> VoucherDocumentTypes { get; set; } = null!;
        public virtual DbSet<Sale> Sales { get; set; } = null!;
        public virtual DbSet<SaleDetail> SaleDetails { get; set; } = null!;

        /*protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Server=DESKTOP-V6PGHMD;Database=SaleWeb;Trusted_Connection=True;");
            }
        }*/

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "Modern_Spanish_CI_AS");

            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
