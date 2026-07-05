namespace SmartAssessment.API.Server.DTOs;

public class ResultDto
{
    public int TotalScore { get; set; }

    public decimal Percentage { get; set; }

    public bool IsPassed { get; set; }
}