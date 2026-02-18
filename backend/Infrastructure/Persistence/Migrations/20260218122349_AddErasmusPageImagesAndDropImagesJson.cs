using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddErasmusPageImagesAndDropImagesJson : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ImagesJson",
                table: "ErasmusPages");

            migrationBuilder.CreateTable(
                name: "ErasmusPageImages",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ErasmusPageId = table.Column<int>(type: "int", nullable: false),
                    ImageBase64 = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ErasmusPageImages", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ErasmusPageImages_ErasmusPages_ErasmusPageId",
                        column: x => x.ErasmusPageId,
                        principalTable: "ErasmusPages",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ErasmusPageImages_ErasmusPageId",
                table: "ErasmusPageImages",
                column: "ErasmusPageId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ErasmusPageImages");

            migrationBuilder.AddColumn<string>(
                name: "ImagesJson",
                table: "ErasmusPages",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
