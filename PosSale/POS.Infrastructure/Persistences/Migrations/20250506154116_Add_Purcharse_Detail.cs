using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace POS.Infrastructure.Persistences.Migrations
{
    public partial class Add_Purcharse_Detail : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Purcharse",
                columns: table => new
                {
                    PurcharseId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Observation = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SubTotal = table.Column<decimal>(type: "decimal(10,2)", nullable: false),
                    Igv = table.Column<decimal>(type: "decimal(10,2)", nullable: false),
                    TotalAmount = table.Column<decimal>(type: "decimal(10,2)", nullable: false),
                    WarehouseId = table.Column<int>(type: "int", nullable: false),
                    ProviderId = table.Column<int>(type: "int", nullable: false),
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
                    table.PrimaryKey("PK_Purcharse", x => x.PurcharseId);
                    table.ForeignKey(
                        name: "FK_Purcharse_Provider_ProviderId",
                        column: x => x.ProviderId,
                        principalTable: "Provider",
                        principalColumn: "ProviderId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Purcharse_Warehouses_WarehouseId",
                        column: x => x.WarehouseId,
                        principalTable: "Warehouses",
                        principalColumn: "WarehouseId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PurcharseDetail",
                columns: table => new
                {
                    PurcharseId = table.Column<int>(type: "int", nullable: false),
                    ProductId = table.Column<int>(type: "int", nullable: false),
                    Quantity = table.Column<int>(type: "int", nullable: false),
                    UnitPurcharsePrice = table.Column<decimal>(type: "decimal(10,2)", nullable: false),
                    Total = table.Column<decimal>(type: "decimal(10,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PurcharseDetail", x => new { x.PurcharseId, x.ProductId });
                    table.ForeignKey(
                        name: "FK_PurcharseDetail_Products_ProductId",
                        column: x => x.ProductId,
                        principalTable: "Products",
                        principalColumn: "ProductId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PurcharseDetail_Purcharse_PurcharseId",
                        column: x => x.PurcharseId,
                        principalTable: "Purcharse",
                        principalColumn: "PurcharseId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Purcharse_ProviderId",
                table: "Purcharse",
                column: "ProviderId");

            migrationBuilder.CreateIndex(
                name: "IX_Purcharse_WarehouseId",
                table: "Purcharse",
                column: "WarehouseId");

            migrationBuilder.CreateIndex(
                name: "IX_PurcharseDetail_ProductId",
                table: "PurcharseDetail",
                column: "ProductId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PurcharseDetail");

            migrationBuilder.DropTable(
                name: "Purcharse");
        }
    }
}
