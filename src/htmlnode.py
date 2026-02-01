class HTMLNode:
    def __init__(self, tag=None, value=None, children=None, props=None):
        self.tag = tag
        self.value = value 
        self.children = children 
        self.props = props 

    def to_html(self): 
        raise NotImplementedError("not implemented")
    
    def props_to_html(self): 
        if self.props is None:
            return ""
        html_string = ""
        for key in self.props: 
            html_string += " " + f'{key}="{self.props[key]}"'
        return html_string 

    def __repr__(self):
        return f"HTMLNode {self.tag}, {self.value}, {self.children}, {self.props}"

class LeafNode(HTMLNode): 
    def __init__(self, tag, value, props=None):
        super().__init__(tag, value, None, props)

    
    def to_html(self):
        if self.tag in ("img", "br", "hr"):
            return f"<{self.tag}{self.props_to_html()}>"
        if self.value is None:
            raise ValueError("All LeafNode's must have a value")
        elif self.tag is None:
            return self.value 
        return f"<{self.tag}{self.props_to_html()}>{self.value}</{self.tag}>"

    def __repr__(self):
        return f"HTMLNode {self.tag}, {self.value}, {self.props}"

class ParentNode(HTMLNode):
    def __init__(self, tag, children, props=None):
        super().__init__(tag, None, children, props)

    def to_html(self):
        if self.tag is None:
            raise ValueError("Must have HTML tag")
        elif self.children is None:
            raise ValueError("Must have children")
        html_string = ""
        for child in self.children: 
            # child.to_html() 
            html_string += child.to_html()
        return f'<{self.tag}>{html_string}</{self.tag}>'

