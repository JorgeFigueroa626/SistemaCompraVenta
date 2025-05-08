using POS.Application.Common.Bases.Response;

namespace POS.Application.Service.Interfaces
{
    public interface IGenerateExcelApplication
    {
        byte[] GenerateToExcel<T>(IEnumerable<T> data, List<(string ColumnName, string PropertyName)> columns);


    }
}
