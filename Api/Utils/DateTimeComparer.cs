using System;
using System.Collections.Generic;

namespace LiveDiagram.Api.Utils
{
    public class DateTimeComparer : IComparer<DateTime>
    {
        private readonly SortDirection _sortDirection;

        public DateTimeComparer(SortDirection sortDirection)
        {
            _sortDirection = sortDirection;
        }

        public DateTimeComparer() : this(SortDirection.Asc) { }

        public int Compare(DateTime x, DateTime y)
        {
            var result = x.CompareTo(y);
            return _sortDirection == SortDirection.Asc ? result : -result;
        }
    }
}
