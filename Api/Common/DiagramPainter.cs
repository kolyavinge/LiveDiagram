using System.Drawing;
using LiveDiagram.Api.Model;

namespace LiveDiagram.Api.Common
{
    public class DiagramPainter
    {
        public Color ItemColor { get; set; }

        public Font ItemFont { get; set; }

        public int FinalWidth { get; set; }

        public DiagramPainter()
        {
            ItemColor = Color.FromArgb(209, 227, 255);
            ItemFont = new Font("Courier New", 10, FontStyle.Bold);
            FinalWidth = 200;
        }

        public Bitmap CreateImage(Diagram diagram)
        {
            var image = new Bitmap((int)diagram.Width, (int)diagram.Height);
            var graph = Graphics.FromImage(image);
            graph.Clear(Color.White);
            var relationPen = new Pen(Color.Gray, 5);
            var itemBrush = new SolidBrush(ItemColor);
            var sf = new StringFormat() { Alignment = StringAlignment.Center };
            foreach (var relation in diagram.Relations)
            {
                foreach (var segment in relation.Segments)
                {
                    graph.DrawRectangle(relationPen, segment.X, segment.Y, segment.Width, segment.Height);
                }
            }
            foreach (var item in diagram.Items)
            {
                graph.FillRectangle(itemBrush, item.X, item.Y, item.Width, item.Height);
                graph.DrawRectangle(Pens.Black, item.X, item.Y, item.Width, item.Height);
                graph.DrawString(item.Title, ItemFont, Brushes.Black, new RectangleF(item.X, item.Y + 10, item.Width, 20), sf);
            }

            image = new Bitmap(image, FinalWidth, (int)(FinalWidth * diagram.Height / diagram.Width));

            return image;
        }
    }
}
