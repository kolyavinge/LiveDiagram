using System;
using System.Collections.Generic;

namespace LiveDiagram.Api.Utils
{
    public class StringLogicalComparer : IComparer<string>
    {
        public int Compare(string x, string y)
        {
            int? xNumber = null, yNumber = null;
            var length = Math.Min(x.Length, y.Length);
            int i;
            for (i = 0; i < length; i++)
            {
                if (Char.IsDigit(x[i]) && Char.IsDigit(y[i]))
                {
                    xNumber = (xNumber ?? 0) * 10 + (x[i] - 30);
                    yNumber = (yNumber ?? 0) * 10 + (y[i] - 30);
                }
                else
                {
                    int result;
                    if (xNumber.HasValue && yNumber.HasValue)
                    {
                        result = xNumber.Value.CompareTo(yNumber.Value);
                        if (result != 0) return result;
                        xNumber = yNumber = null;
                    }
                    result = x[i].CompareTo(y[i]);
                    if (result != 0) return result;
                }
            }
            if (i < x.Length && Char.IsDigit(x[i]))
            {
                xNumber = (xNumber ?? 0) * 10 + (x[i] - 30);
            }
            if (i < y.Length && Char.IsDigit(y[i]))
            {
                yNumber = (yNumber ?? 0) * 10 + (y[i] - 30);
            }
            if (xNumber.HasValue && yNumber.HasValue)
            {
                return xNumber.Value.CompareTo(yNumber.Value);
            }

            return 0;
        }
    }
}
