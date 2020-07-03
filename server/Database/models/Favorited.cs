namespace server.Models
{
    public class Favorited
    {
        public string id { get; set; }
        public string title { get; set; }
        public string thumbnail { get; set; }
        public string authors { get; set; }
        public string eTag { get; set; }
        public string kind { get; set; }


        public System.Guid UserId { get; set; }
        public User User { get; set; }
    }

     public class FavoritedView
    {
        public string id { get; set; }
        public string title { get; set; }
        public string thumbnail { get; set; }
        public string authors { get; set; }
        public string eTag { get; set; }
        public string kind { get; set; }

    }
}