using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddGalleryTitleAndImagePath : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ImageBase64",
                table: "GalleryItems",
                newName: "Title");

            migrationBuilder.AddColumn<string>(
                name: "ImagePath",
                table: "GalleryItems",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ImagePath",
                table: "GalleryItems");

            migrationBuilder.RenameColumn(
                name: "Title",
                table: "GalleryItems",
                newName: "ImageBase64");
        }
    }
}
