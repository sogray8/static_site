from enum import Enum
from splitblocks import markdown_to_blocks
from htmlnode import HTMLNode, LeafNode, ParentNode
from text_to_textnodes import text_to_textnodes
from textnode import text_node_to_html_node, TextNode, TextType
import re 

class BlockType(Enum):
    PARAGRAPH = "paragraph"
    HEADING = "heading"
    CODE = "code"
    QUOTE = "quote"
    UNORDERED_LIST = "unordered_list"
    ORDERED_LIST = "ordered_list"

def block_to_block_type(block): 
    lines = block.split("\n")
    first_line = lines[0]

    # code 
    if len(lines) >= 2 and lines[0] == "```" and lines[-1] == "```": 
        return BlockType.CODE 
    
    # quote 
    all_lines_are_quote = True 
    for line in lines: 
        if not line.startswith(">"):
            all_lines_are_quote = False
            break 
    if all_lines_are_quote:
        return BlockType.QUOTE
    
    # unordered 
    all_unordered = True 
    for line in lines:
        if not line.startswith("- "):
            all_unordered = False
            break 
    if all_unordered:
        return BlockType.UNORDERED_LIST
        
    # ordered 
    expected = 1 
    all_ordered = True 
    for line in lines: 
        prefix = f"{expected}. "
        if not line.startswith(prefix):
            all_ordered = False
            break 
        expected += 1
    
    if all_ordered:
        return BlockType.ORDERED_LIST


    # headings 
    count = 0
    for ch in first_line: 
        if ch == "#":
            count += 1
        else: 
            break 
    if len(first_line) > count and 1 <= count <= 6 and first_line[count] == " ": 
        return BlockType.HEADING
    
    return BlockType.PARAGRAPH


# Block to HTML 

def markdown_to_html_node(markdown):
    blocks = markdown_to_blocks(markdown)
    children = []
    for block in blocks:
        html_node = block_to_html_node(block)
        children.append(html_node)
    return ParentNode("div", children, None)


def block_to_html_node(block):
    block_type = block_to_block_type(block)
    if block_type == BlockType.PARAGRAPH:
        return paragraph_to_html_node(block)
    if block_type == BlockType.HEADING:
        return heading_to_html_node(block)
    if block_type == BlockType.CODE:
        return code_to_html_node(block)
    if block_type == BlockType.ORDERED_LIST:
        return olist_to_html_node(block)
    if block_type == BlockType.UNORDERED_LIST:
        return ulist_to_html_node(block)
    if block_type == BlockType.QUOTE:
        return quote_to_html_node(block)
    raise ValueError("invalid block type")


def text_to_children(text):
    text_nodes = text_to_textnodes(text)
    children = []
    for text_node in text_nodes:
        html_node = text_node_to_html_node(text_node)
        children.append(html_node)
    return children


def paragraph_to_html_node(block):
    lines = block.split("\n")
    paragraph = " ".join(lines)
    children = text_to_children(paragraph)
    return ParentNode("p", children)


def heading_to_html_node(block):
    level = 0
    for char in block:
        if char == "#":
            level += 1
        else:
            break
    if level + 1 >= len(block):
        raise ValueError(f"invalid heading level: {level}")
    text = block[level + 1 :]
    children = text_to_children(text)
    return ParentNode(f"h{level}", children)


def code_to_html_node(block):
    if not block.startswith("```") or not block.endswith("```"):
        raise ValueError("invalid code block")
    text = block[4:-3]
    raw_text_node = TextNode(text, TextType.TEXT)
    child = text_node_to_html_node(raw_text_node)
    code = ParentNode("code", [child])
    return ParentNode("pre", [code])


def olist_to_html_node(block):
    items = block.split("\n")
    html_items = []
    for item in items:
        parts = item.split(". ", 1)
        text = parts[1]
        children = text_to_children(text)
        html_items.append(ParentNode("li", children))
    return ParentNode("ol", html_items)


def ulist_to_html_node(block):
    items = block.split("\n")
    html_items = []
    for item in items:
        text = item[2:]
        children = text_to_children(text)
        html_items.append(ParentNode("li", children))
    return ParentNode("ul", html_items)


def quote_to_html_node(block):
    lines = block.split("\n")
    new_lines = []
    for line in lines:
        if not line.startswith(">"):
            raise ValueError("invalid quote block")
        new_lines.append(line.lstrip(">").strip())
    content = " ".join(new_lines)
    children = text_to_children(content)
    return ParentNode("blockquote", children)


# def markdown_to_html_node(markdown):
#     blocks = markdown_to_blocks(markdown)
#     html_blocks = [] 
#     for block in blocks: 
#         if block_to_block_type(block) == BlockType.HEADING:
#             split_block = block.split("# ")
#             heading = split_block[1]
#             size = len(split_block[0]) + 1
#             children = text_to_children(heading)
#             html_node = ParentNode(f"h{size}", children, None)
#             html_blocks.append(html_node)
#         if block_to_block_type(block) == BlockType.QUOTE:
#             split_block = block.split("> ")
#             quote = split_block[1]
#             children = text_to_children(quote)
#             html_node = ParentNode("blockquote", children, None)
#             html_blocks.append(html_node)
#         if block_to_block_type(block) == BlockType.UNORDERED_LIST:
#             split_block = block.split("\n")
#             list_children = []
#             for item in split_block:
#                 if item == "" or item.startswith("- ") == False:
#                     continue 
#                 new_item = item.removeprefix("- ")
#                 list_node = text_to_children(new_item)
#                 list_html_node = ParentNode("li", list_node, None)
#                 list_children.append(list_html_node)
#             unordered_html_node = ParentNode("ul", list_children, None)
#             html_blocks.append(unordered_html_node)
#         if block_to_block_type(block) == BlockType.ORDERED_LIST:
#             split_block = block.split("\n")
#             list_children = []
#             for item in split_block:
#                 match = re.match(r"^\d\. ", item)
#                 if match: 
#                     new_item = item[match.end():]
#                     list_node = text_to_children(new_item)
#                     list_html_node = ParentNode("li",list_node, None)
#                     list_children.append(list_html_node)
#                 else: 
#                     continue 
#             ordered_html_node = ParentNode("ol", list_children, None)
#             html_blocks.append(ordered_html_node)
#         if block_to_block_type(block) == BlockType.PARAGRAPH:
#             children = text_to_children(block)
#             html_node = ParentNode("p", children, None)
#             html_blocks.append(html_node)
#         if block_to_block_type(block) == BlockType.CODE:
#             raw_content = block.removeprefix("```")
#             raw_content = raw_content.removesuffix("```")
#             text_node = TextNode(raw_content, TextType.CODE)
#             leaf_node = text_node_to_html_node(text_node)
#             parent_node = ParentNode("pre", [leaf_node], None)
#             html_blocks.append(parent_node)
#     return ParentNode("div", html_blocks, None)

# def text_to_children(text):
#     html_nodes = [] 
#     texts = text_to_textnodes(text)
#     for ch in texts: 
#         html_nodes.append(text_node_to_html_node(ch))






# def html_node_to_leaf_node(html_node): 
#     if "h" in html_node.tag:
#         return LeafNode(html_node.tag, html_node.value)
#     if "blockquote" in html_node.tag:
#         return LeafNode(html_node.tag, html_node.value)

# heading = "### HEADING"

# html_heading = markdown_to_html_node(heading)
# print(html_heading)


# def text_node_to_html_node(text_node):
#     if text_node.text_type == TextType.TEXT:
#         return LeafNode(None, text_node.text)
#     elif text_node.text_type == TextType.BOLD:
#         return LeafNode("b", text_node.text)
#     elif text_node.text_type == TextType.ITALIC:
#         return LeafNode("i", text_node.text)
#     elif text_node.text_type == TextType.CODE:
#         return LeafNode("code", text_node.text)
#     elif text_node.text_type == TextType.LINK:
#         return LeafNode("a", text_node.text, {"href": text_node.url})
#     elif text_node.text_type == TextType.IMAGE:
#         return LeafNode("img", None, {"src": text_node.url, "alt": text_node.text})