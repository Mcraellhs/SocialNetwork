using Microsoft.EntityFrameworkCore.Migrations;

namespace SocialNetwork.API.Migrations
{
    public partial class MainPhoto : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "MainPhotoUrl",
                table: "Users",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "isMain",
                table: "Photos",
                type: "INTEGER",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "MainPhotoUrl",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "isMain",
                table: "Photos");
        }
    }
}
