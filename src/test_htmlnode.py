import unittest

from htmlnode import HTMLNode, LeafNode, ParentNode

class TestHTMLNode(unittest.TestCase): 
    def test_eq(self):
        node = HTMLNode(props={"href": "https://www.google.com", "target": "_blank"})
        first_test = node.props_to_html()
        test_expected = ' href="https://www.google.com" target="_blank"'
        self.assertEqual(first_test, test_expected)

        node2 = HTMLNode(props={"href": "https://www.google.com"})
        second_test = node2.props_to_html()
        test2_expected = ' href="https://www.google.com"'
        self.assertEqual(second_test, test2_expected)

        node3 = HTMLNode(props={"img src": "url/of/image.jpg", "alt": "Description of image"})
        third_test = node3.props_to_html()
        test3_expected = ' img src="url/of/image.jpg" alt="Description of image"'
        self.assertEqual(third_test, test3_expected)

class TestLeafNode(unittest.TestCase):
    def test_leaf_to_html_p(self):
        leaf_node = LeafNode("p", "Hello, world!")
        self.assertEqual(leaf_node.to_html(), "<p>Hello, world!</p>")

        leaf_node2 = LeafNode("a", "Click me!", {"href": "https://www.google.com"})
        self.assertEqual(leaf_node2.to_html(), '<a href="https://www.google.com">Click me!</a>')

        leaf_node3 = LeafNode("img", "Description of image", {"src": "url/of/image.jpg" })
        self.assertEqual(leaf_node3.to_html(), '<img src="url/of/image.jpg">Description of image</img>')

class TestParentNode(unittest.TestCase):
    def test_parent_to_html(self):
        child_node = LeafNode("span", "child")
        parent_node = ParentNode("div", [child_node])
        self.assertEqual(parent_node.to_html(), "<div><span>child</span></div>")
    
    def test_to_html_with_grandchildren(self):
        grandchild_node = LeafNode("b", "grandchild")
        child_node = ParentNode("span", [grandchild_node])
        parent_node = ParentNode("div", [child_node])
        self.assertEqual(
            parent_node.to_html(),
            "<div><span><b>grandchild</b></span></div>",
        )



if __name__ == "__main__":
    unittest.main()