﻿    namespace BookStore.DTO
    {
        public class UserDTO
        {

            public string Id { get; set; }
            public string UserName { get; set; }    
            public string? Email { get; set; }
            public string Role { get; set; }

            public DateTime? CreatedAt { get; set; }

            public string? FullName { get; set; }

            

            public int? CustomerID { get; set; } // ignore

        public List<OrderDTO> Orders { get; set; } = new List<OrderDTO>();
    }
    }
