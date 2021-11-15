using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using lpnu.Data.Entities;
using lpnu.Exceptions;
using lpnu.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace lpnu.Services
{
    public class RoleService : IRoleService
    {
        private readonly UserManager<User> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        
        public RoleService(UserManager<User> userManager, RoleManager<IdentityRole> roleManager)
        {
            _userManager = userManager;
            _roleManager = roleManager;
        }

        public async Task CreateRoleAsync(string role)
        {
            if (string.IsNullOrEmpty(role))
            {
                throw new RestException(HttpStatusCode.BadRequest);
            }
            
            var checkRole = await _roleManager.FindByNameAsync(role);
            if (checkRole != null)
            {
                throw new RestException(HttpStatusCode.Conflict);
            }

            var result = await _roleManager.CreateAsync(new IdentityRole(role));
            if (!result.Succeeded)
            {
                throw new RestException(HttpStatusCode.InternalServerError);
            }
        }

        public async Task<List<string>> GetRolesAsync()
        {
            var result = await _roleManager.Roles
                .Select(t => t.Name)
                .ToListAsync();

            return result;
        }
    }
}