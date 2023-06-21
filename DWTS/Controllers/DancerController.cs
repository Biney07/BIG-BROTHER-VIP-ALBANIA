
using DWTS.Data;
using DWTS.DTOs;
using DWTS.Models;
using Microsoft.AspNetCore.Mvc;

namespace DWTS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DancerController : Controller
    {

            private readonly ApplicationDbContext _context;

            public DancerController(ApplicationDbContext context)
            {
                _context = context;
            }
            [HttpGet]
            public ActionResult<IEnumerable<Dancer>> GetDancers()
            {
                var dancerDTOs = _context.Dancer.Select(dancer => new DancerDTO
                {
                    Name = dancer.Name,
                    Biografia = dancer.Biografia,
                    PictureUrl = dancer.PictureUrl,
                    Age = dancer.Age,
                    RelationshipStatus = dancer.RelationshipStatus,
                    Profesioni = dancer.Profesioni
                });

                return Ok(dancerDTOs);
            }

            // GET api/dancers/{id}
            [HttpGet("{id}")]
            public ActionResult<Dancer> GetDancer(int id)
            {
                var dancer = _context.Dancer.FirstOrDefault(d => d.Id == id);
                if (dancer == null)
                {
                    return NotFound();
                }

                var dancerDTO = new DancerDTO
                {
                    
                    Name = dancer.Name,
                    Biografia = dancer.Biografia,
                    PictureUrl = dancer.PictureUrl,
                    Age = dancer.Age,
                    RelationshipStatus = dancer.RelationshipStatus,
                    Profesioni = dancer.Profesioni
                };

                return Ok(dancerDTO);
            }

            // POST api/_context.Dancer
            [HttpPost]
            public ActionResult<Dancer> CreateDancer(DancerDTO dancerDTO)
            {
                var dancer = new Dancer
                {
                       
                    Name = dancerDTO.Name,
                    Surname = dancerDTO.Surname,
                    Biografia = dancerDTO.Biografia,
                    PictureUrl = dancerDTO.PictureUrl,
                    Age = dancerDTO.Age,
                    RelationshipStatus = dancerDTO.RelationshipStatus,
                    Profesioni = dancerDTO.Profesioni
                };

                _context.Dancer.Add(dancer);

                return CreatedAtAction(nameof(GetDancer), new { id = dancer.Id }, dancerDTO);
            }

            // PUT api/_context.Dancer/{id}
            [HttpPut("{id}")]
            public IActionResult UpdateDancer(int id, DancerDTO dancerDTO)
            {
                var dancer = _context.Dancer.FirstOrDefault(d => d.Id == id);
                if (dancer == null)
                {
                    return NotFound();
                }

                dancer.Name = dancerDTO.Name;
                dancer.Biografia = dancerDTO.Biografia;
                dancer.PictureUrl = dancerDTO.PictureUrl;
                dancer.Age = dancerDTO.Age;
                dancer.RelationshipStatus = dancerDTO.RelationshipStatus;
                dancer.Profesioni = dancerDTO.Profesioni;

                return NoContent();
            }

            // DELETE api/_context.Dancer/{id}
            [HttpDelete("{id}")]
            public IActionResult DeleteDancer(int id)
            {
                var dancer = _context.Dancer.FirstOrDefault(d => d.Id == id);
                if (dancer == null)
                {
                    return NotFound();
                }

                _context.Dancer.Remove(dancer);

                return NoContent();
            }
        [HttpPost("set-nominated-true/{id}")]
        public IActionResult SetNominatedToTrue(int id)
        {
            var dancer = _context.Dancer.FirstOrDefault(d => d.Id == id);
            if (dancer == null)
            {
                return NotFound();
            }

            dancer.Nominated = true;
            _context.SaveChanges();

            return Ok();
        }
        [HttpPost("set-nominated-false/{id}")]
        public IActionResult SetNominatedToFalse(int id)
        {
            var dancer = _context.Dancer.FirstOrDefault(d => d.Id == id);
            if (dancer == null)
            {
                return NotFound();
            }

            dancer.Nominated = false;
            _context.SaveChanges();

            return Ok();
        }


        [HttpPost("set-eleminuar-false/{id}")]
        public IActionResult SetEleminuarToFalse(int id)
        {
            var dancer = _context.Dancer.FirstOrDefault(d => d.Id == id);
            if (dancer == null)
            {
                return NotFound();
            }

            dancer.Eleminuar = false;
            _context.SaveChanges();

            return Ok();
        }
        [HttpPost("set-eleminuar-true/{id}")]
        public IActionResult SetEleminuarToTrue(int id)
        {
            var dancer = _context.Dancer.FirstOrDefault(d => d.Id == id);
            if (dancer == null)
            {
                return NotFound();
            }

            dancer.Eleminuar = true;
            _context.SaveChanges();

            return Ok();
        }

    }
}
