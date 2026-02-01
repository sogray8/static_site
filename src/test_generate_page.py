import unittest 
from generate_page import extract_title

class TestExtractTitle(unittest.TestCase):
    def test_extract_title(self):
        md = """
# Document 
With some contents 
And even more contents 
"""
        heading = extract_title(md)
        self.assertEqual("Document", heading)