using System.Linq;
using LiveDiagram.Api.Utils;
using NUnit.Framework;

namespace LiveDiagram.Api.Test.Utils
{
    public class StringLogicalComparerTest
    {
        private StringLogicalComparer _comparer;

        [SetUp]
        public void Setup()
        {
            _comparer = new StringLogicalComparer();
        }

        [Test]
        public void StringLogicalComparer_1()
        {
            var result = new[] { "aaa 1", "aaa 10", "aaa 2" }.OrderBy(x => x, _comparer).ToList();
            Assert.AreEqual("aaa 1", result[0]);
            Assert.AreEqual("aaa 2", result[1]);
            Assert.AreEqual("aaa 10", result[2]);
        }

        [Test]
        public void StringLogicalComparer_2()
        {
            var result = new[] { "c", "a", "b" }.OrderBy(x => x, _comparer).ToList();
            Assert.AreEqual("a", result[0]);
            Assert.AreEqual("b", result[1]);
            Assert.AreEqual("c", result[2]);
        }

        [Test]
        public void StringLogicalComparer_3()
        {
            var result = new[] { "12", "8", "1000" }.OrderBy(x => x, _comparer).ToList();
            Assert.AreEqual("8", result[0]);
            Assert.AreEqual("12", result[1]);
            Assert.AreEqual("1000", result[2]);
        }

        [Test]
        public void StringLogicalComparer_4()
        {
            var result = new[] { "16", "20", "9" }.OrderBy(x => x, _comparer).ToList();
            Assert.AreEqual("9", result[0]);
            Assert.AreEqual("16", result[1]);
            Assert.AreEqual("20", result[2]);
        }
    }
}
