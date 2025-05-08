namespace POS.Application.Dtos.Request
{
    public class PurcharseDetailRequestDto
    {
        public int ProductId { get; set; }
        public int Quantity { get; set; }
        public decimal UnitPurcharsePrice { get; set; }
        public decimal Total { get; set; }
    }
}