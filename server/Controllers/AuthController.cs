using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Google.Apis.Auth;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using server.Models;
using server.Helpers;
using server.Services;

namespace server.Controllers
{
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [Route("api/[controller]")]
    public class AuthController : Controller
    {
        private IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            this._authService = authService;
        }

        [AllowAnonymous]
        [HttpPost("google")]
        public async Task<IActionResult> Google([FromBody] UserView userView)
        {
            try
            {

                var payload = GoogleJsonWebSignature.ValidateAsync(userView.tokenId, new GoogleJsonWebSignature.ValidationSettings()).Result;
                var user = await _authService.Authenticate(payload);

                var claims = new[]
                {
                    new Claim(JwtRegisteredClaimNames.Sub, Security.Encrypt(AppSettings.appSettings.JwtEmailEncryption,user.Email)),
                    new Claim(JwtRegisteredClaimNames.Jti, user.UserId.ToString()),
                };

                var key = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(AppSettings.appSettings.JwtSecret));
                var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

                var token = new JwtSecurityToken(String.Empty,
                  String.Empty,
                  claims,
                  expires: DateTime.Now.AddHours(3),
                  signingCredentials: creds);

                return Ok(new
                {
                    user.UserId,
                    token = new JwtSecurityTokenHandler().WriteToken(token),
                    displayName = user.Name,
                    displayPicture = user.Picture
                });
            }
            catch (Exception ex)
            {
                // Helpers.SimpleLogger.Log(ex);
                BadRequest(ex.Message);
            }
            return BadRequest();
        }
    }
}
