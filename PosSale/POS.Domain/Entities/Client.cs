﻿namespace POS.Domain.Entities
{
    public class Client : BaseEntity
    {
        public string? Name { get; set; }
        public string? Email { get; set; }
        public string? DocumentNumber { get; set; }
        public string? Address { get; set; }
        public string? Phone { get; set; }
        ///RELACION DE MUCHOS A UNO
        public int DocumentTypeId { get; set; }
        public virtual DocumentType DocumentType { get; set; } = null!;
    }
}
