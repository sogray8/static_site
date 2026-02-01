import unittest 
from markdown_extract import extract_markdown_images, extract_markdown_links

class TestMarkdownExtract(unittest.TestCase):
    def test_extract_markdown_images(self):
        matches = extract_markdown_images("This is text with an ![image](https://i.imgur.com/zjjcJKZ.png)")
        self.assertListEqual([("image", "https://i.imgur.com/zjjcJKZ.png")], matches)

        matches = extract_markdown_images("This is text with an ![my_image](some.image.com)")
        self.assertListEqual([("my_image", "some.image.com")], matches)

        matches = extract_markdown_images("This is text with an ![a_cool_image](another.image.com)")
        self.assertListEqual([("a_cool_image", "another.image.com")], matches)
    
    def test_extract_markdown_url(self):
        matches = extract_markdown_links("This is text with a link [to boot dev](https://www.boot.dev) and [to youtube](https://www.youtube.com/@bootdotdev)")
        self.assertListEqual([("to boot dev", "https://www.boot.dev"), ("to youtube", "https://www.youtube.com/@bootdotdev")], matches)

        matches = extract_markdown_links("This is text with a link [google](google.com) and [fake youtube](https://www.fakeyoutube.com/@bootdotdev)")
        self.assertListEqual([("google", "google.com"), ("fake youtube", "https://www.fakeyoutube.com/@bootdotdev")], matches)

        matches = extract_markdown_links("This is text with a link [to not boot dev](https://www.notboot.dev) and [to cooltube](https://www.cooltube.com/@bootdotdev)")
        self.assertListEqual([("to not boot dev", "https://www.notboot.dev"), ("to cooltube", "https://www.cooltube.com/@bootdotdev")], matches)