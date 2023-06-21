using Microsoft.Extensions.Hosting;

namespace DWTS.Models
{
    public class Dancer
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Biografia { get; set; }
        public string PictureUrl { get; set; }
        public int Age { get; set; }
        public bool RelationshipStatus { get; set; }
        public string Profesioni { get; set; }
        public bool Nominated { get; set; } = false;
        public bool Eleminuar { get; set; } = false;
    }

}
