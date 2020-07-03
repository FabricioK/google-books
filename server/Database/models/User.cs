using System.Collections.Generic;

namespace server.Models
{
    public class User
    {
        public System.Guid UserId { get; set; }
        public string Name { get; set; }
        public string Picture { get; set; }
        public string Email { get; set; }
        public string oauthSubject { get; set; }
        public string oauthIssuer { get; set; }
        public List<Favorited> Favorited { get; } = new List<Favorited>();

    }

    public class UserView
    {
        public string tokenId { get; set; }
    }
}