from textnode import TextNode
from generate_page import generate_page, generate_pages_recursive
import os 
import shutil
import sys 

def static_to_public(public_path, private_path, is_root=True):        
    if is_root:
        if os.path.exists(public_path):
            shutil.rmtree(public_path)
        os.mkdir(public_path)
    for file in os.listdir(private_path): 
        file_path = os.path.join(private_path, file)
        if os.path.isfile(file_path) == True: 
            shutil.copy(file_path, public_path)
        else: 
            subdirectory = os.path.join(public_path, file)
            if os.path.exists(subdirectory) == False:
                os.mkdir(subdirectory)
            static_to_public(subdirectory, file_path, is_root=False)


dir_path_static = "./static"
dir_path_public = "./docs"
dir_path_content = "./content"
template_path = "./template.html"
default_basepath = "/"

def main():
    basepath = default_basepath
    if len(sys.argv) >= 2:
        basepath = sys.argv[1]

    static_to_public(dir_path_public, dir_path_static)
    generate_pages_recursive(
        dir_path_content,
        template_path,
        dir_path_public,
        basepath,
    ) 

     

main()








