from textnode import TextNode
from generate_page import generate_page, generate_pages_recursive
import os 
import shutil

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



def main():
    public_path = "/Users/timgray/static_site/public"
    private_path = "/Users/timgray/static_site/static"
    static_to_public(public_path, private_path)
    generate_pages_recursive("/Users/timgray/static_site/content", "/Users/timgray/static_site/template.html", "/Users/timgray/static_site/public")
 

     

main()








