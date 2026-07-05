using System.ComponentModel.DataAnnotations;

namespace SmartAssessment.API.Server.DTOs;

public class QuestionDto
{
    [Required]
    public int ExamId { get; set; }

    [Required]
    public string QuestionText { get; set; } = string.Empty;

    public int Score { get; set; } = 1;
}