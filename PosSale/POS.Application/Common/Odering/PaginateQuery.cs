using POS.Application.Commons.Base.Request;

namespace POS.Application.Common.Odering
{
    public static class PaginateQuery
    {
        public static IQueryable<T> Paginate<T>(this IQueryable<T> queryable, BasePaginationRequest request)
        {
            return queryable.Skip((request.NumPage - 1) * request.Records).Take(request.Records);
        }
    }
}
