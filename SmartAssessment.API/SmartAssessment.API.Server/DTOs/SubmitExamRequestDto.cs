namespace SmartAssessment.API.Server.DTOs;

public class SubmitExamRequestDto
{
    public int ExamId { get; set; }

    public List<SubmitExamDto> Answers { get; set; } = new();
}