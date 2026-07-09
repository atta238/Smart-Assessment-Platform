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


    [HttpPost("start/{examId}")]
    public async Task<IActionResult> StartExam(int examId)
    {
        var studentId = int.Parse(
            User.FindFirst(ClaimTypes.NameIdentifier)!.Value
        );

        var exam = await _context.Exams.FindAsync(examId);

        if (exam == null)
            return NotFound("Exam not found");

        var studentExam = await _context.StudentExams
            .FirstOrDefaultAsync(x =>
                x.StudentId == studentId &&
                x.ExamId == examId);

        if (studentExam != null && studentExam.SubmittedAt != null)
        {
            return BadRequest("Exam already submitted");
        }

        if (studentExam == null)
        {
            studentExam = new StudentExam
            {
                StudentId = studentId,
                ExamId = examId,
                StartedAt = DateTime.Now
            };

            _context.StudentExams.Add(studentExam);
            await _context.SaveChangesAsync();
        }

        return Ok(new
        {
            duration = exam.Duration,
            startedAt = studentExam.StartedAt
        });
    }


    [HttpGet("remaining-time/{examId}")]
    public async Task<IActionResult> GetRemainingTime(int examId)
    {
        var studentId = int.Parse(
            User.FindFirst(ClaimTypes.NameIdentifier)!.Value
        );

        var exam = await _context.Exams.FindAsync(examId);

        if (exam == null)
            return NotFound("Exam not found");

        var studentExam = await _context.StudentExams
            .FirstOrDefaultAsync(x =>
                x.StudentId == studentId &&
                x.ExamId == examId);

        if (studentExam == null)
            return BadRequest("Exam was not started");

        var endTime = studentExam.StartedAt.AddMinutes(exam.Duration);

        var remainingSeconds = Math.Max(
            (int)(endTime - DateTime.Now).TotalSeconds,
            0
        );

        Console.WriteLine($"StartedAt: {studentExam.StartedAt}");
        Console.WriteLine($"Now: {DateTime.Now}");
        Console.WriteLine($"Remaining: {remainingSeconds}");

        return Ok(new
        {
            remainingSeconds
        });
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
            return NotFound("Exam not found");

        var existingResult = await _context.Results
            .FirstOrDefaultAsync(r =>
                r.StudentId == studentId &&
                r.ExamId == dto.ExamId);

        if (existingResult != null)
            return BadRequest("Exam already submitted");

        var studentExam = await _context.StudentExams
            .FirstOrDefaultAsync(x =>
                x.StudentId == studentId &&
                x.ExamId == dto.ExamId);

        if (studentExam == null)
            return BadRequest("Exam was not started");

        if (studentExam.SubmittedAt != null)
            return BadRequest("Exam already submitted");

        var examEndTime = studentExam.StartedAt.AddMinutes(exam.Duration);

        if (DateTime.Now > examEndTime)
        {
            studentExam.SubmittedAt = examEndTime;
        }
        else
        {
            studentExam.SubmittedAt = DateTime.Now;
        }

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
                var question = await _context.Questions.FindAsync(answer.QuestionId);

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
            return NotFound("Result not found");

        return Ok(new ResultDto
        {
            TotalScore = result.TotalScore,
            Percentage = result.Percentage,
            IsPassed = result.IsPassed
        });
    }
}