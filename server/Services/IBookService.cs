using System.Threading.Tasks;
using System.Collections.Generic;
using System;
using System.Linq;
using server.Models;
using Google.Apis.Auth.OAuth2.Flows;
using Google.Apis.Auth.OAuth2;
using Google.Apis.Books.v1;
using Google.Apis.Auth.OAuth2.Responses;
using Google.Apis.Services;
using Google.Apis.Books.v1.Data;
using Google.Apis.Util.Store;
using System.Threading;
using System.IO;
using System.Net.Http;
using System.Net.Http.Headers;

namespace server.Services
{
    public interface IBookService
    {
        Task<Bookshelves> ListBookshelves();
        Task<Volumes> SearchBooks(String _query);
        List<Favorited> ListFavoritedBooks(System.Guid UserId);
        void AddOrRemoveFavorited(Favorited favorited);
    }

    public class BookService : IBookService
    {
        private readonly BooksContext _context;
        string[] scopes = new string[] {
            BooksService.Scope.Books
            };

        public BookService(BooksContext context)
        {
            _context = context;
        }
        public async Task<Bookshelves> ListBookshelves()
        {
            UserCredential credential;
            using (var stream = new FileStream("client_secrets.json", FileMode.Open, FileAccess.Read))
            {
                credential = await GoogleWebAuthorizationBroker.AuthorizeAsync(
                    GoogleClientSecrets.Load(stream).Secrets,
                    new[] { BooksService.Scope.Books },
                   Environment.UserName, CancellationToken.None, new FileDataStore("Books.ListMyLibrary"));
            }
            var service = new BooksService(new BaseClientService.Initializer()
            {
                HttpClientInitializer = credential,
                ApplicationName = "Books API Sample",
            });

            return await service.Mylibrary.Bookshelves.List().ExecuteAsync();
        }

        public async Task<Volumes> SearchBooks(String _query)
        {
            UserCredential credential;
            using (var stream = new FileStream("client_secrets.json", FileMode.Open, FileAccess.Read))
            {
                credential = await GoogleWebAuthorizationBroker.AuthorizeAsync(
                    GoogleClientSecrets.Load(stream).Secrets,
                    new[] { BooksService.Scope.Books },
                   Environment.UserName, CancellationToken.None, new FileDataStore("Books.ListMyLibrary"));
            }
            var service = new BooksService(new BaseClientService.Initializer()
            {
                HttpClientInitializer = credential,
                ApplicationName = "Books API Sample",
            });
            VolumesResource.ListRequest request = service.Volumes.List();
            request.MaxResults = 40;
            request.Q = _query;
            return await request.ExecuteAsync();
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
                    Email = payload.Email,
                    oauthSubject = payload.Subject,
                    oauthIssuer = payload.Issuer
                };
                _context.Users.Add(u);
                _context.SaveChanges();
            }
            return u;
        }

        public List<Favorited> ListFavoritedBooks(System.Guid UserId)
        {
            var u = _context.Favorited.Where(x => x.UserId == UserId);

            return u.ToList();
        }

        public void AddOrRemoveFavorited(Favorited favorited)
        {

            var f = _context.Favorited.Where(x => x.id == favorited.id && x.UserId == favorited.UserId).FirstOrDefault();
            
            if (f == null)
            {
                favorited.User = _context.Users.Where(x => x.UserId == favorited.UserId).FirstOrDefault();
                _context.Favorited.Add(favorited);
                _context.SaveChanges();
            }
            else
            {
                _context.Favorited.Remove(f);
                _context.SaveChanges();
            }
           
        }
    }
}