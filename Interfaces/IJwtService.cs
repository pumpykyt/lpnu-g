using System.Threading.Tasks;
using lpnu.Data.Entities;

namespace lpnu.Interfaces
{
    public interface IJwtService
    {
         Task<string> GenerateJwtAsync(User user);
    }
}