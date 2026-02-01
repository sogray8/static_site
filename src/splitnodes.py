from textnode import TextNode,TextType
from markdown_extract import extract_markdown_links, extract_markdown_images

def split_nodes_delimiter(old_nodes, delimiter, text_type):
    new_nodes = []
    for old_node in old_nodes:
        if old_node.text_type != TextType.TEXT:
            new_nodes.append(old_node)
            continue
        split_nodes = []
        sections = old_node.text.split(delimiter)
        if len(sections) % 2 == 0:
            raise ValueError("invalid markdown, formatted section not closed")
        for i in range(len(sections)):
            if sections[i] == "":
                continue
            if i % 2 == 0:
                split_nodes.append(TextNode(sections[i], TextType.TEXT))
            else:
                split_nodes.append(TextNode(sections[i], text_type))
        new_nodes.extend(split_nodes)
    return new_nodes


def split_nodes_link(old_nodes):
    new_nodes = []
    for node in old_nodes:
        if node.text_type != TextType.TEXT:
            new_nodes.append(node)
            continue 

        markdown_links = extract_markdown_links(node.text)
        if len(markdown_links) == 0:
            new_nodes.append(node)
            continue 
        remaining_text = node.text 
        for (url_text, url_link) in markdown_links: 
            sections = remaining_text.split(f"[{url_text}]({url_link})", 1)
            before = sections[0]
            after = sections[1]
            if before != "":
                new_nodes.append(TextNode(before, TextType.TEXT))
            new_nodes.append(TextNode(url_text, TextType.LINK, url_link,))
            remaining_text = after
        if remaining_text != "":
            new_nodes.append(TextNode(remaining_text, TextType.TEXT))
            

    return new_nodes

def split_nodes_image(old_nodes):
    new_nodes = []
    for node in old_nodes:
        if node.text_type != TextType.TEXT:
            new_nodes.append(node)
            continue 

        markdown_links = extract_markdown_images(node.text)
        if len(markdown_links) == 0:
            new_nodes.append(node)
            continue 
        remaining_text = node.text 
        for (alt_text, img_url) in markdown_links: 
            sections = remaining_text.split(f"![{alt_text}]({img_url})", 1)
            before = sections[0]
            after = sections[1]
            if before != "":
                new_nodes.append(TextNode(before, TextType.TEXT))
            new_nodes.append(TextNode(alt_text, TextType.IMAGE, img_url,))
            remaining_text = after
        if remaining_text != "":
            new_nodes.append(TextNode(remaining_text, TextType.TEXT))
            

    return new_nodes



