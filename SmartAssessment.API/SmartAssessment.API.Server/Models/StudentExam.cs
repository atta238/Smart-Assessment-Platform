namespace SmartAssessment.API.Server.Models
{
    public class StudentExam
    {
        public int Id { get; set; }

        public int StudentId { get; set; }

        public int ExamId { get; set; }

        public DateTime StartedAt { get; set; }

        public DateTime? SubmittedAt { get; set; }

        public User Student { get; set; }

        public Exam Exam { get; set; }
    }
}
