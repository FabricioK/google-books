using System.Threading.Tasks;
using System.Collections.Generic;
using System;
using System.Linq;
using server.Models;

namespace server.Services
{
    public interface IAuthService
    {
        Task<User> Authenticate(Google.Apis.Auth.GoogleJsonWebSignature.Payload payload);
    }

    public class AuthService : IAuthService
    {
        private readonly BooksContext _context;
        public AuthService(BooksContext context)
        {
            _context = context;
        }
        public async Task<User> Authenticate(Google.Apis.Auth.GoogleJsonWebSignature.Payload payload)
        {
            await Task.Delay(1);
            return this.FindUserOrAdd(payload);
        }

        private User FindUserOrAdd(Google.Apis.Auth.GoogleJsonWebSignature.Payload payload)
        {
            var u = _context.Users.Where(x => x.Email == payload.Email).FirstOrDefault();
            if (u == null)
            {
                u = new User()
                {
                    UserId = Guid.NewGuid(),
                    Name = payload.Name,
                    Picture = payload.Picture,
                    Email = payload.Email,
                    oauthSubject = payload.Subject,
                    oauthIssuer = payload.Issuer,
                };
                _context.Users.Add(u);
                _context.SaveChanges();
            }

            return u;

        }

        private void Refresh()
        {

        }
    }
}