using FluentValidation;
using POS.Application.Dtos.Request;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace POS.Application.Validators.Category
{
    public class CategoryValidator : AbstractValidator<CategoryRequestDto>
    {
        public CategoryValidator()
        {
            RuleFor(c => c.Name)
                .NotNull().WithMessage("El Campo nombre no puede ser nulo")
                .NotEmpty().WithMessage("El Campo nombre no puede ser vacio");
            /*RuleFor(c => c.State)
                .NotNull()
                .NotEmpty();*/
           
        }
    }
}
