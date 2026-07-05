using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace SmartAssessment.API.Server.Models;

public partial class Choice
{
    [Key]
    public int Id { get; set; }

    public int QuestionId { get; set; }

    [StringLength(300)]
    public string ChoiceText { get; set; } = null!;

    public bool IsCorrect { get; set; }

    [ForeignKey("QuestionId")]
    [InverseProperty("Choices")]
    public virtual Question Question { get; set; } = null!;

    [InverseProperty("Choice")]
    public virtual ICollection<StudentAnswer> StudentAnswers { get; set; } = new List<StudentAnswer>();
}
