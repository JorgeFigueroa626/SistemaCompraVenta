﻿using POS.Application.Commons.Base.Request;

using System.Linq.Dynamic.Core;

namespace POS.Application.Common.Odering
{
    public class OrderingQuery : IOrderingQuery
    {
        public IQueryable<TDTO> Ordering<TDTO>(BasePaginationRequest request, IQueryable<TDTO> queryable, bool pagination = false) where TDTO : class
        {
            IQueryable<TDTO> queryDto = request.Order == "desc" ? queryable.OrderBy($"{request.Sort} descending")
                                                                : queryable.OrderBy($"{request.Sort} ascending");

            if (pagination)
            {
                queryDto = queryDto.Paginate(request);
            }
            return queryDto;
        }
    }
}
