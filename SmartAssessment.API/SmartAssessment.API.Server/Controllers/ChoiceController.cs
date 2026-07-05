using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SmartAssessment.API.Server.Data;
using SmartAssessment.API.Server.DTOs;
using SmartAssessment.API.Server.Models;

using Microsoft.AspNetCore.Authorization;
namespace SmartAssessment.API.Server.Controllers;

[Authorize(Roles = "Instructor")]
[Route("api/[controller]")]
[ApiController]
public class ChoiceController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public ChoiceController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        return Ok(await _context.Choices.ToListAsync());
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var choice = await _context.Choices.FindAsync(id);

        if (choice == null)
            return NotFound();

        return Ok(choice);
    }

    [HttpPost]
    public async Task<IActionResult> Create(ChoiceDto dto)
    {
        var choice = new Choice
        {
            QuestionId = dto.QuestionId,
            ChoiceText = dto.ChoiceText,
            IsCorrect = dto.IsCorrect
        };

        _context.Choices.Add(choice);
        await _context.SaveChangesAsync();

        return Ok(choice);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, ChoiceDto dto)
    {
        var choice = await _context.Choices.FindAsync(id);

        if (choice == null)
            return NotFound();

        choice.QuestionId = dto.QuestionId;
        choice.ChoiceText = dto.ChoiceText;
        choice.IsCorrect = dto.IsCorrect;

        await _context.SaveChangesAsync();

        return Ok(choice);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var choice = await _context.Choices.FindAsync(id);

        if (choice == null)
            return NotFound();

        _context.Choices.Remove(choice);
        await _context.SaveChangesAsync();

        return Ok("Choice Deleted Successfully");
    }
}