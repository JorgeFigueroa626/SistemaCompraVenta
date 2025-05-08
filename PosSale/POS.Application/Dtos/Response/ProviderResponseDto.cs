namespace POS.Application.Dtos.Response
{
    public class ProviderResponseDto
    {
       public int ProviderId { get; set; }
        public string? Name { get; set; }
        public string? Email { get; set; }
        public string? DocumentNumber { get; set; }
        public string? Address { get; set; }
        public string? Phone { get; set; }

        //PUEDE LLAMAR ID DEL DOCUMENTOTYPE
        //ESPECIFICAMOS COMO STRING PARA MAPEAR EL TIPO DE DOC
        public string? DocumentType { get; set; }
        public DateTime? AuditCreateDate { get; set; }
        public int State { get; set; }
        public string? StateProvider { get; set; }
    }
}
