    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using Microsoft.EntityFrameworkCore;

    namespace SmartAssessment.API.Server.Models;

    public partial class Question
    {
        [Key]
        public int Id { get; set; }

        public int ExamId { get; set; }

        public string QuestionText { get; set; } = null!;

        public int Score { get; set; }

        [InverseProperty("Question")]
        public virtual ICollection<Choice> Choices { get; set; } = new List<Choice>();

        [ForeignKey("ExamId")]
        [InverseProperty("Questions")]
        public virtual Exam Exam { get; set; } = null!;

        [InverseProperty("Question")]
        public virtual ICollection<StudentAnswer> StudentAnswers { get; set; } = new List<StudentAnswer>();
    }
