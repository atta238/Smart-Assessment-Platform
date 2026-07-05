using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace SmartAssessment.API.Server.Models;

public partial class StudentAnswer
{
    [Key]
    public int Id { get; set; }

    public int StudentId { get; set; }

    public int ExamId { get; set; }

    public int QuestionId { get; set; }

    public int ChoiceId { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? AnsweredAt { get; set; }

    [ForeignKey("ChoiceId")]
    [InverseProperty("StudentAnswers")]
    public virtual Choice Choice { get; set; } = null!;

    [ForeignKey("ExamId")]
    [InverseProperty("StudentAnswers")]
    public virtual Exam Exam { get; set; } = null!;

    [ForeignKey("QuestionId")]
    [InverseProperty("StudentAnswers")]
    public virtual Question Question { get; set; } = null!;

    [ForeignKey("StudentId")]
    [InverseProperty("StudentAnswers")]
    public virtual User Student { get; set; } = null!;
}
