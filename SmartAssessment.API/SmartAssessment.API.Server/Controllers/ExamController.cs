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
public class ExamController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public ExamController(ApplicationDbContext context)
    {
        _context = context;
    }

    
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var exams = await _context.Exams.ToListAsync();
        return Ok(exams);
    }

   
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var exam = await _context.Exams.FindAsync(id);

        if (exam == null)
            return NotFound();

        return Ok(exam);
    }

    
    [HttpPost]
    [Authorize(Roles = "Instructor")]
    public async Task<IActionResult> Create(ExamDto dto)
    {
        var exam = new Exam
        {
            Title = dto.Title,
            Description = dto.Description,
            Duration = dto.Duration,
            StartTime = dto.StartTime,
            EndTime = dto.EndTime,
            PassPercentage = dto.PassPercentage,
            InstructorId = dto.InstructorId
        };

        _context.Exams.Add(exam);
        await _context.SaveChangesAsync();

        return Ok(exam);
    }

    
    [HttpPut("{id}")]
    [Authorize(Roles = "Instructor")]
    public async Task<IActionResult> Update(int id, ExamDto dto)
    {
        var exam = await _context.Exams.FindAsync(id);

        if (exam == null)
            return NotFound();

        exam.Title = dto.Title;
        exam.Description = dto.Description;
        exam.Duration = dto.Duration;
        exam.StartTime = dto.StartTime;
        exam.EndTime = dto.EndTime;
        exam.PassPercentage = dto.PassPercentage;
        exam.InstructorId = dto.InstructorId;

        await _context.SaveChangesAsync();

        return Ok(exam);
    }

    
    [HttpDelete("{id}")]
    [Authorize(Roles = "Instructor")]
    public async Task<IActionResult> Delete(int id)
    {
        var exam = await _context.Exams.FindAsync(id);

        if (exam == null)
            return NotFound();

        _context.Exams.Remove(exam);
        await _context.SaveChangesAsync();

        return Ok("Exam Deleted Successfully");
    }
}