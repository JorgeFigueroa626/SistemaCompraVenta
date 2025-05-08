using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace POS.Infrastructure.Persistences.Migrations
{
    public partial class Add_Entity_VoucherDocumentType : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "VoucherDocumentTypes",
                columns: table => new
                {
                    VoucherDocumentTypeId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Description = table.Column<string>(type: "nvarchar(128)", maxLength: 128, nullable: true),
                    AuditCreateUser = table.Column<int>(type: "int", nullable: true),
                    AuditCreateDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    AuditUpdateUser = table.Column<int>(type: "int", nullable: true),
                    AuditUpdateDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    AuditDeleteUser = table.Column<int>(type: "int", nullable: true),
                    AuditDeleteDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    State = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VoucherDocumentTypes", x => x.VoucherDocumentTypeId);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "VoucherDocumentTypes");
        }
    }
}
