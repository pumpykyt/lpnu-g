using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace lpnu.Data.Entities
{
    public class User : IdentityUser
    {
        public virtual ICollection<Order> Orders { get; set; }
    }
}