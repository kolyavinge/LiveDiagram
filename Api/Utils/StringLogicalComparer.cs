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
                    xNumber = (xNumber ?? 0) * 10 + GetDigit(x[i]);
                    yNumber = (yNumber ?? 0) * 10 + GetDigit(y[i]);
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
                xNumber = (xNumber ?? 0) * 10 + GetDigit(x[i]);
            }
            if (i < y.Length && Char.IsDigit(y[i]))
            {
                yNumber = (yNumber ?? 0) * 10 + GetDigit(y[i]);
            }
            if (xNumber.HasValue && yNumber.HasValue)
            {
                return xNumber.Value.CompareTo(yNumber.Value);
            }

            return 0;
        }

        private int GetDigit(char ch)
        {
            if (ch == '0') return 0;
            if (ch == '1') return 1;
            if (ch == '2') return 2;
            if (ch == '3') return 3;
            if (ch == '4') return 4;
            if (ch == '5') return 5;
            if (ch == '6') return 6;
            if (ch == '7') return 7;
            if (ch == '8') return 8;
            else return 9;
        }
    }
}
