using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace SmartAssessment.API.Server.Models;

[Index("Name", Name = "UQ__Roles__737584F673AACE87", IsUnique = true)]
public partial class Role
{
    [Key]
    public int Id { get; set; }

    [StringLength(30)]
    public string Name { get; set; } = null!;

    [InverseProperty("Role")]
    public virtual ICollection<User> Users { get; set; } = new List<User>();
}
