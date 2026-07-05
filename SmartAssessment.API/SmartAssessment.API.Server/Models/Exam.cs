using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace SmartAssessment.API.Server.Models;

public partial class Exam
{
    [Key]
    public int Id { get; set; }

    [StringLength(200)]
    public string Title { get; set; } = null!;

    [StringLength(500)]
    public string? Description { get; set; }

    public int Duration { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime StartTime { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime EndTime { get; set; }

    public int PassPercentage { get; set; }

    public int InstructorId { get; set; }

    [ForeignKey("InstructorId")]
    [InverseProperty("Exams")]
    public virtual User Instructor { get; set; } = null!;

    [InverseProperty("Exam")]
    public virtual ICollection<Question> Questions { get; set; } = new List<Question>();

    [InverseProperty("Exam")]
    public virtual ICollection<Result> Results { get; set; } = new List<Result>();

    [InverseProperty("Exam")]
    public virtual ICollection<StudentAnswer> StudentAnswers { get; set; } = new List<StudentAnswer>();
}
