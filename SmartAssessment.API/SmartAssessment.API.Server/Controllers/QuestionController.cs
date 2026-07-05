    using Microsoft.AspNetCore.Mvc;
    using Microsoft.EntityFrameworkCore;
    using SmartAssessment.API.Server.Data;
    using SmartAssessment.API.Server.DTOs;
    using SmartAssessment.API.Server.Models;

    using Microsoft.AspNetCore.Authorization;
    namespace SmartAssessment.API.Server.Controllers;

    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class QuestionController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public QuestionController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await _context.Questions.ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var question = await _context.Questions.FindAsync(id);

            if (question == null)
                return NotFound();

            return Ok(question);
        }

        [HttpPost]
        [Authorize(Roles = "Instructor")]
        public async Task<IActionResult> Create(QuestionDto dto)
        {
            var question = new Question
            {
                ExamId = dto.ExamId,
                QuestionText = dto.QuestionText,
                Score = dto.Score
            };

            _context.Questions.Add(question);
            await _context.SaveChangesAsync();

            return Ok(question);
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Instructor")]
        public async Task<IActionResult> Update(int id, QuestionDto dto)
        {
            var question = await _context.Questions.FindAsync(id);

            if (question == null)
                return NotFound();

            question.ExamId = dto.ExamId;
            question.QuestionText = dto.QuestionText;
            question.Score = dto.Score;

            await _context.SaveChangesAsync();

            return Ok(question);
        }
    [HttpDelete("{id}")]
    [Authorize(Roles = "Instructor")]
    public async Task<IActionResult> Delete(int id)
    {
        var question = await _context.Questions
            .Include(q => q.Choices)
            .FirstOrDefaultAsync(q => q.Id == id);

        if (question == null)
            return NotFound();

        // Delete Student Answers
        var studentAnswers = await _context.StudentAnswers
            .Where(s => s.QuestionId == id)
            .ToListAsync();

        _context.StudentAnswers.RemoveRange(studentAnswers);

        // Delete Choices
        _context.Choices.RemoveRange(question.Choices);

        // Delete Question
        _context.Questions.Remove(question);

        await _context.SaveChangesAsync();

        return Ok("Question Deleted Successfully");
    }
    [HttpGet("exam/{examId}")]
        [Authorize]
        public async Task<IActionResult> GetQuestionsByExam(int examId)
        {
            var questions = await _context.Questions
                .Where(q => q.ExamId == examId)
                .Include(q => q.Choices)
                .ToListAsync();

            return Ok(questions);
        }
    }