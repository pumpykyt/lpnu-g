using System.Threading.Tasks;
using lpnu.Dtos;

namespace lpnu.Interfaces
{
    public interface IAuthService
    {
        Task RegisterAsync(UserRegisterDto model);
        Task<LoginResponseDto> LoginAsync(UserLoginDto model);
        
    }
}