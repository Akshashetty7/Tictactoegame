using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

public class User
{
    [Key] // Marks this property as the primary key
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)] // Identity column
    public int Id { get; set; }

    [Required] // Makes the property non-nullable
    [StringLength(50)] // Limits the length to match the NVARCHAR(50)
    public required string Username { get; set; }

    [Required] // Makes the property non-nullable
    [StringLength(255)] // Limits the length to match the NVARCHAR(255)
    public required string PasswordHash { get; set; }
}