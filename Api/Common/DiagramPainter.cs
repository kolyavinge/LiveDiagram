using System;
using System.Drawing;
using System.Linq;
using LiveDiagram.Api.Model;

namespace LiveDiagram.Api.Common
{
    public class DiagramPainter
    {
        public Color ItemColor { get; set; }

        public Font ItemFont { get; set; }

        public int FinalWidth { get; set; }

        public int FinalHeight { get; set; }

        public int MaxSize { get; set; }

        public DiagramPainter()
        {
            ItemColor = Color.FromArgb(209, 227, 255);
            ItemFont = new Font("Courier New", 10, FontStyle.Bold);
            FinalWidth = 180;
            FinalHeight = 100;
            MaxSize = 2000;
        }

        public Bitmap CreateImage(Diagram diagram)
        {
            var image = new Bitmap((int)Math.Min(MaxSize, diagram.Width), (int)Math.Min(MaxSize, diagram.Height));
            var graph = Graphics.FromImage(image);
            graph.Clear(Color.White);
            var relationPen = new Pen(Color.Gray, 5);
            var itemBrush = new SolidBrush(ItemColor);
            var sf = new StringFormat() { Alignment = StringAlignment.Center };
            foreach (var relation in diagram.Relations)
            {
                foreach (var segment in relation.Segments.Where(s => s.X < image.Width && s.Y < image.Height))
                {
                    graph.DrawRectangle(relationPen, segment.X, segment.Y, segment.Width, segment.Height);
                }
            }
            foreach (var item in diagram.Items.Where(item => item.X < image.Width && item.Y < image.Height))
            {
                graph.FillRectangle(itemBrush, item.X, item.Y, item.Width, item.Height);
                graph.DrawRectangle(Pens.Black, item.X, item.Y, item.Width, item.Height);
                graph.DrawString(item.Title, ItemFont, Brushes.Black, new RectangleF(item.X, item.Y + 10, item.Width, 20), sf);
            }

            image = new Bitmap(image, FinalWidth, FinalWidth * image.Height / image.Width);
            if (image.Height > FinalHeight)
            {
                image = new Bitmap(image, FinalHeight * image.Width / image.Height, FinalHeight);
            }

            return image;
        }
    }
}
