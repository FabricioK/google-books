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
    public class BooksController : ControllerBase
    {
        private IBookService _bookService;
        public BooksController(IBookService bookService)
        {
            this._bookService = bookService;
        }

        [HttpGet]
        public IEnumerable<Volume> Get(String q)
        {
            if (String.IsNullOrEmpty(q)) return new List<Volume>();
            Volumes retorno = _bookService.SearchBooks(q).Result;
            return retorno.Items.ToList();
        }
    }
}
