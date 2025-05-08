namespace POS.Application.Dtos.Response
{
    public class VoucherDocumentTypeResponseDto
    {
        public int voucherDocumentTypeId { get; set; }
        public string? Description { get; set; }
        public DateTime? AuditCreateDate { get; set; }
        public int State { get; set; }
        public string? StateVoucherDocumentType { get; set; }
    }
}
