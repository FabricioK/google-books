using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Google.Apis.Books.v1.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using server.Services;
using server.Models;
using System.IdentityModel.Tokens.Jwt;

namespace server.Controllers
{
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [ApiController]
    [Route("[controller]")]
    public class FavoritedController : ControllerBase
    {
        private IBookService _bookService;
        public FavoritedController(IBookService bookService)
        {
            this._bookService = bookService;
        }

        [HttpGet]
        public IEnumerable<Favorited> Get(String q)
        {
            Guid id = Guid.Parse(HttpContext.User.Claims.FirstOrDefault(x => x.Type == JwtRegisteredClaimNames.Jti).Value);
            return _bookService.ListFavoritedBooks(id);
        }

        [HttpPost]
        public IEnumerable<FavoritedView> Post(Favorited favorito)
        {
            Guid id = Guid.Parse(HttpContext.User.Claims.FirstOrDefault(x => x.Type == JwtRegisteredClaimNames.Jti).Value);
            favorito.UserId = id;
            _bookService.AddOrRemoveFavorited(favorito);
            List<Favorited> favoritos = _bookService.ListFavoritedBooks(id);
            return favoritos.Select(x => new FavoritedView
            {
                id = x.id,
                title = x.title,
                thumbnail = x.thumbnail,
                authors = x.authors,
                eTag = x.eTag,
                kind = x.kind,
            }).ToList();
        }
    }
}
