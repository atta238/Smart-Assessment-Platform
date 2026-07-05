using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SmartAssessment.API.Server.Data;
using SmartAssessment.API.Server.DTOs;
using SmartAssessment.API.Server.Models;
using System.Security.Claims;

namespace SmartAssessment.API.Server.Controllers;

[Authorize(Roles = "Student")]
[Route("api/[controller]")]
[ApiController]
public class StudentController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public StudentController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpPost("submit")]
    public async Task<IActionResult> SubmitExam(SubmitExamRequestDto dto)
    {
        var studentId = int.Parse(
            User.FindFirst(ClaimTypes.NameIdentifier)!.Value
        );

        var exam = await _context.Exams
            .Include(e => e.Questions)
            .FirstOrDefaultAsync(e => e.Id == dto.ExamId);

        if (exam == null)
            return NotFound("Exam not found.");

        int totalScore = exam.Questions.Sum(q => q.Score);
        int studentScore = 0;

        foreach (var answer in dto.Answers)
        {
            var choice = await _context.Choices
                .FirstOrDefaultAsync(c => c.Id == answer.ChoiceId);

            if (choice == null)
                continue;

            _context.StudentAnswers.Add(new StudentAnswer
            {
                StudentId = studentId,
                ExamId = dto.ExamId,
                QuestionId = answer.QuestionId,
                ChoiceId = answer.ChoiceId,
                AnsweredAt = DateTime.Now
            });

            if (choice.IsCorrect)
            {
                var question = await _context.Questions
                    .FindAsync(answer.QuestionId);

                if (question != null)
                    studentScore += question.Score;
            }
        }

        decimal percentage = totalScore == 0
            ? 0
            : (decimal)studentScore / totalScore * 100;

        bool passed = percentage >= exam.PassPercentage;

        var result = new Result
        {
            StudentId = studentId,
            ExamId = dto.ExamId,
            TotalScore = studentScore,
            Percentage = percentage,
            IsPassed = passed,
            SubmittedAt = DateTime.Now
        };

        _context.Results.Add(result);

        await _context.SaveChangesAsync();

        return Ok(new ResultDto
        {
            TotalScore = studentScore,
            Percentage = percentage,
            IsPassed = passed
        });
    }

    [HttpGet("result/{examId}")]
    public async Task<IActionResult> GetResult(int examId)
    {
        var studentId = int.Parse(
            User.FindFirst(ClaimTypes.NameIdentifier)!.Value
        );

        var result = await _context.Results
            .FirstOrDefaultAsync(r =>
                r.ExamId == examId &&
                r.StudentId == studentId);

        if (result == null)
            return NotFound("Result not found.");

        return Ok(new ResultDto
        {
            TotalScore = result.TotalScore,
            Percentage = result.Percentage,
            IsPassed = result.IsPassed
        });
    }
}