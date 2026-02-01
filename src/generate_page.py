import os 
from block import markdown_to_html_node
from pathlib import Path



def extract_title(markdown): 
    split_markdown = markdown.split("\n")
    for line in split_markdown: 
        if line.startswith("# "): 
            heading = line.strip("# ")
            heading = heading.strip()
            return heading 

def generate_page(from_path, template_path, dest_path):
    print(f"Generating page {from_path} to {dest_path} using {template_path}")
    with open(from_path) as f:
        md_string = f.read()

    with open(template_path) as f:
        template_string = f.read()

    html_content = markdown_to_html_node(md_string)
    html_content = html_content.to_html()

    heading = extract_title(md_string)

    html = template_string.replace("{{ Title }}", heading)
    html = html.replace("{{ Content }}", html_content)

    path_of_dest = os.path.dirname(dest_path)
    os.makedirs(path_of_dest, exist_ok=True)
    
    with open(dest_path, "w") as f:
        f.write(html)


def generate_pages_recursive(dir_path_content, template_path, dest_dir_path):
    content_dir = os.listdir(dir_path_content)

    for content in content_dir: 
        content_path = os.path.join(dir_path_content, content)
        if os.path.isfile(content_path):
            with open(content_path) as f:
                md_string = f.read()
            html_string = markdown_to_html_node(md_string)
            html_string = html_string.to_html()
            with open(template_path) as f:
                template_string = f.read()

            heading = extract_title(md_string)
            html = template_string.replace("{{ Title }}", heading)
            html = html.replace("{{ Content }}", html_string)

            current_path = Path(content)
            new_path = current_path.with_suffix(".html")

            new_dest_dir_path = os.path.join(dest_dir_path, new_path)

            os.makedirs(os.path.dirname(new_dest_dir_path), exist_ok=True)

            with open(new_dest_dir_path, "w") as f:
                f.write(html)


        if os.path.isfile(content_path) == False:
            sub_dir_path_content = os.path.join(dir_path_content, content)
            new_dest_dir_path = os.path.join(dest_dir_path, content)
            generate_pages_recursive(sub_dir_path_content, template_path, new_dest_dir_path)
        