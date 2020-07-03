using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using server.Models;
using Microsoft.Data.Sqlite;

namespace server
{
    public class BooksContext : DbContext
    {
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            var connectionStringBuilder = new SqliteConnectionStringBuilder { DataSource = "MyDb.db" };
            var connectionString = connectionStringBuilder.ToString();
            var connection = new SqliteConnection(connectionString);

            optionsBuilder.UseSqlite(connection);
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Favorited> Favorited { get; set; }
    }
}