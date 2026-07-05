using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace SmartAssessment.API.Server.Models;

public partial class Result
{
    [Key]
    public int Id { get; set; }

    public int StudentId { get; set; }

    public int ExamId { get; set; }

    public int TotalScore { get; set; }

    [Column(TypeName = "decimal(5, 2)")]
    public decimal Percentage { get; set; }

    public bool IsPassed { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? SubmittedAt { get; set; }

    [ForeignKey("ExamId")]
    [InverseProperty("Results")]
    public virtual Exam Exam { get; set; } = null!;

    [ForeignKey("StudentId")]
    [InverseProperty("Results")]
    public virtual User Student { get; set; } = null!;
}
