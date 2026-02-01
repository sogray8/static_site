def markdown_to_blocks(markdown):
    blocks = []
    split_md = markdown.split("\n\n")
    for sentence in split_md:
        if sentence == "": 
            continue 
        blocks.append(sentence.strip())
    return blocks 

