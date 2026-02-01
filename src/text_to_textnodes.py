from splitnodes import split_nodes_delimiter, split_nodes_link, split_nodes_image
from textnode import TextNode, TextType
from markdown_extract import extract_markdown_images

def text_to_textnodes(text): 
    nodes = [TextNode(text, TextType.TEXT)]

    nodes = split_nodes_delimiter(nodes, "`", TextType.CODE)
    nodes = split_nodes_delimiter(nodes, "**", TextType.BOLD)
    nodes = split_nodes_delimiter(nodes, "_", TextType.ITALIC)
    nodes = split_nodes_image(nodes)
    nodes = split_nodes_link(nodes)


    return nodes 

# text = "This is **text** with an _italic_ word and a `code block` and an ![obi wan image](https://i.imgur.com/fJRm4Vk.jpeg) and a [link](https://boot.dev)"

# new_nodes = text_to_textnodes(text)

# print(new_nodes)


# md = """
# ```
# This is text that _should_ remain
# the **same** even with inline stuff
# ```
# """
# new_nodes = text_to_textnodes(md)

# print(new_nodes)