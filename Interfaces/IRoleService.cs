using System.Collections.Generic;
using System.Threading.Tasks;

namespace lpnu.Interfaces
{
    public interface IRoleService
    {
        Task CreateRoleAsync(string role);
        Task<List<string>> GetRolesAsync();
    }
}