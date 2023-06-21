
using DWTS.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace DWTS.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
       : base(options)
        {
        }
        public DbSet<Dancer> Dancer { get; set; }




    }
}
