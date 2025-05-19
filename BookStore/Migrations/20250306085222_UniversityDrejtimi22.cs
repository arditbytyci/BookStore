using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BookStore.Migrations
{
    /// <inheritdoc />
    public partial class UniversityDrejtimi22 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Drejtimed_Universities_UniversityID",
                table: "Drejtimed");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Drejtimed",
                table: "Drejtimed");

            migrationBuilder.RenameTable(
                name: "Drejtimed",
                newName: "Drejtimet");

            migrationBuilder.RenameIndex(
                name: "IX_Drejtimed_UniversityID",
                table: "Drejtimet",
                newName: "IX_Drejtimet_UniversityID");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Drejtimet",
                table: "Drejtimet",
                column: "ID");

            migrationBuilder.AddForeignKey(
                name: "FK_Drejtimet_Universities_UniversityID",
                table: "Drejtimet",
                column: "UniversityID",
                principalTable: "Universities",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Drejtimet_Universities_UniversityID",
                table: "Drejtimet");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Drejtimet",
                table: "Drejtimet");

            migrationBuilder.RenameTable(
                name: "Drejtimet",
                newName: "Drejtimed");

            migrationBuilder.RenameIndex(
                name: "IX_Drejtimet_UniversityID",
                table: "Drejtimed",
                newName: "IX_Drejtimed_UniversityID");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Drejtimed",
                table: "Drejtimed",
                column: "ID");

            migrationBuilder.AddForeignKey(
                name: "FK_Drejtimed_Universities_UniversityID",
                table: "Drejtimed",
                column: "UniversityID",
                principalTable: "Universities",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
