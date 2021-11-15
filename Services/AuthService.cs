using System;
using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using lpnu.Configs;
using lpnu.Data.Entities;
using lpnu.Dtos;
using lpnu.Exceptions;
using lpnu.Interfaces;
using Mapster;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace lpnu.Services
{
    public class AuthService : IAuthService
    {
        private readonly UserManager<User> _userManager;
        private readonly IJwtService _jwtService;

        public AuthService(UserManager<User> userManager, IJwtService jwtService)
        {
            _userManager = userManager;
            _jwtService = jwtService;
        }

        public async Task RegisterAsync(UserRegisterDto model)
        {
            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user != null)
            {
                throw new RestException(HttpStatusCode.Conflict);
            }
            var newUser = model.Adapt<User>();
            var identityResult = await _userManager.CreateAsync(newUser, model.Password);
            var roleResult = await _userManager.AddToRoleAsync(newUser, "customer");
            if (!identityResult.Succeeded)
            {
                throw new RestException(HttpStatusCode.BadRequest);
            }
        }

        public async Task<LoginResponseDto> LoginAsync(UserLoginDto model)
        {
            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user == null)
            {
                throw new RestException(HttpStatusCode.Forbidden);
            }

            var authResult = await _userManager.CheckPasswordAsync(user, model.Password);
            if (!authResult)
            {
                throw new RestException(HttpStatusCode.Forbidden);
            }

            return new LoginResponseDto
            {
                Token = await _jwtService.GenerateJwtAsync(user)
            };
        }
    }
}