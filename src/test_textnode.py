import unittest

from textnode import TextNode, TextType


class TestTextNode(unittest.TestCase):
    def test_eq(self):
        node = TextNode("This is a text node", TextType.BOLD)
        node2 = TextNode("This is a text node", TextType.BOLD)
        self.assertEqual(node, node2)

        node3 = TextNode("This is a text node", TextType.ITALIC, TextType.LINK)
        node4 = TextNode("This is a text node", TextType.ITALIC, TextType.LINK)
        self.assertEqual(node3, node4)

        node5 = TextNode("This is a text node", TextType.BOLD, "[anchor](url)")
        node6 = TextNode("This is a text node", TextType.ITALIC, "[anchor](url)")
        self.assertNotEqual(node5, node6)

        node7 = TextNode("This is a text node", TextType.BOLD, "[anchor](url)")
        node8 = TextNode("This is a text node", TextType.ITALIC)
        self.assertNotEqual(node7, node8)


if __name__ == "__main__":
    unittest.main()