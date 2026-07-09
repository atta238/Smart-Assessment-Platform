using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using SmartAssessment.API.Server.Models;

namespace SmartAssessment.API.Server.Data;

public partial class ApplicationDbContext : DbContext
{
    public ApplicationDbContext()
    {
    }

    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Choice> Choices { get; set; }

    public virtual DbSet<Exam> Exams { get; set; }

    public virtual DbSet<Question> Questions { get; set; }

    public virtual DbSet<Result> Results { get; set; }

    public virtual DbSet<Role> Roles { get; set; }

    public virtual DbSet<StudentAnswer> StudentAnswers { get; set; }

    public virtual DbSet<User> Users { get; set; }

    public DbSet<StudentExam> StudentExams { get; set; }


    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Choice>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Choices__3214EC078B51759B");

            entity.HasOne(d => d.Question).WithMany(p => p.Choices).HasConstraintName("FK_Choice_Question");
        });

        modelBuilder.Entity<Exam>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Exams__3214EC075295F4B7");

            entity.Property(e => e.PassPercentage).HasDefaultValue(50);

            entity.HasOne(d => d.Instructor).WithMany(p => p.Exams)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Exam_Instructor");
        });

        modelBuilder.Entity<Question>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Question__3214EC072CB21472");

            entity.Property(e => e.Score).HasDefaultValue(1);

            entity.HasOne(d => d.Exam).WithMany(p => p.Questions).HasConstraintName("FK_Question_Exam");
        });

        modelBuilder.Entity<Result>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Results__3214EC079201E957");

            entity.Property(e => e.SubmittedAt).HasDefaultValueSql("(getdate())");

            entity.HasOne(d => d.Exam).WithMany(p => p.Results)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Result_Exam");

            entity.HasOne(d => d.Student).WithMany(p => p.Results)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Result_Student");
        });

        modelBuilder.Entity<Role>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Roles__3214EC0798859EDB");
        });

        modelBuilder.Entity<StudentAnswer>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__StudentA__3214EC0712A8F634");

            entity.Property(e => e.AnsweredAt).HasDefaultValueSql("(getdate())");

            entity.HasOne(d => d.Choice).WithMany(p => p.StudentAnswers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Answer_Choice");

            entity.HasOne(d => d.Exam).WithMany(p => p.StudentAnswers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Answer_Exam");

            entity.HasOne(d => d.Question).WithMany(p => p.StudentAnswers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Answer_Question");

            entity.HasOne(d => d.Student).WithMany(p => p.StudentAnswers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Answer_Student");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Users__3214EC0794A4CA05");

            entity.Property(e => e.CreatedAt).HasDefaultValueSql("(getdate())");

            entity.HasOne(d => d.Role).WithMany(p => p.Users)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_User_Role");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
