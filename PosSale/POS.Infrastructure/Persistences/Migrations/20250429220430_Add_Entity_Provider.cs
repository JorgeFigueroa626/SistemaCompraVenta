using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace POS.Infrastructure.Persistences.Migrations
{
    public partial class Add_Entity_Provider : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "DocumentTypeId",
                table: "DocumentTypes",
                newName: "Id");

            migrationBuilder.AddColumn<DateTime>(
                name: "AuditCreateDate",
                table: "DocumentTypes",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "AuditCreateUser",
                table: "DocumentTypes",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "AuditDeleteDate",
                table: "DocumentTypes",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "AuditDeleteUser",
                table: "DocumentTypes",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "AuditUpdateDate",
                table: "DocumentTypes",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "AuditUpdateUser",
                table: "DocumentTypes",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Provider",
                columns: table => new
                {
                    ProviderId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DocumentNumber = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
                    Address = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Phone = table.Column<string>(type: "varchar(15)", unicode: false, maxLength: 15, nullable: false),
                    DocumentTypeId = table.Column<int>(type: "int", nullable: false),
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
                    table.PrimaryKey("PK_Provider", x => x.ProviderId);
                    table.ForeignKey(
                        name: "FK_Provider_DocumentTypes_DocumentTypeId",
                        column: x => x.DocumentTypeId,
                        principalTable: "DocumentTypes",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Provider_DocumentTypeId",
                table: "Provider",
                column: "DocumentTypeId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Provider");

            migrationBuilder.DropColumn(
                name: "AuditCreateDate",
                table: "DocumentTypes");

            migrationBuilder.DropColumn(
                name: "AuditCreateUser",
                table: "DocumentTypes");

            migrationBuilder.DropColumn(
                name: "AuditDeleteDate",
                table: "DocumentTypes");

            migrationBuilder.DropColumn(
                name: "AuditDeleteUser",
                table: "DocumentTypes");

            migrationBuilder.DropColumn(
                name: "AuditUpdateDate",
                table: "DocumentTypes");

            migrationBuilder.DropColumn(
                name: "AuditUpdateUser",
                table: "DocumentTypes");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "DocumentTypes",
                newName: "DocumentTypeId");
        }
    }
}
