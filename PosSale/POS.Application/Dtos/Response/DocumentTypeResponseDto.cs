namespace POS.Application.Dtos.Response
{
    public class DocumentTypeResponseDto
    {
        public int DocumentTypeId { get; set; }
        public string? Code { get; set; }
        public string? Name { get; set; }
        public string? Abbreviation { get; set; }
        public DateTime? AuditCreateDate { get; set; }
        public int State { get; set; }
        public string? StateDocumentType { get; set; }
    }
}
