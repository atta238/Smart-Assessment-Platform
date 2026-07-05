using System.ComponentModel.DataAnnotations;

namespace SmartAssessment.API.Server.DTOs;

public class ChoiceDto
{
    [Required]
    public int QuestionId { get; set; }

    [Required]
    public string ChoiceText { get; set; } = string.Empty;

    public bool IsCorrect { get; set; }
}