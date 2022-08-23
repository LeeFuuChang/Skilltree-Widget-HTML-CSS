class TreeDiagram { // 樹狀圖
    constructor(element, configuration){
        this.defaultNodeSize  = "40";
        this.defaultLineColor = "#cecfd3";
        this.defaultNodeColor = "#e74832";
        this.defaultTextColor = "#000000";

        this.diagram = element;
        this.diagram.classList.add("tree-diagram", "df", "jcc", "aic");

        this.diagram.style.setProperty("--node-size" , configuration.nodeSize ?configuration.nodeSize :this.defaultNodeSize );
        this.diagram.style.setProperty("--line-color", configuration.lineColor?configuration.lineColor:this.defaultLineColor);
        this.diagram.style.setProperty("--node-color", configuration.nodeColor?configuration.nodeColor:this.defaultNodeColor);
        this.diagram.style.setProperty("--text-color", configuration.textColor?configuration.textColor:this.defaultTextColor);

        if( !configuration.nodes ) throw new Error("empty tree configuration thrown");
        this.buildLayer(configuration.nodes, this.diagram);
    }
    buildLayer = (nodes, container)=>{
        for(let node of nodes){
            let nodeElement = document.createElement("div");
            nodeElement.classList.add("node", "df", "jcc");

            let nodeDisplay = document.createElement("div");
            nodeDisplay.classList.add("node-display", "df", "aic", "jcc");

            let childContainer = document.createElement("div");
            childContainer.classList.add("child-container", "df", "jcc");

            nodeElement.appendChild(nodeDisplay);
            nodeElement.appendChild(childContainer);

            if(node.lineColor) nodeElement.style.setProperty("--line-color", node.lineColor);
            if(node.nodeColor) nodeElement.style.setProperty("--node-color", node.nodeColor);
            if(node.textColor) nodeElement.style.setProperty("--text-color", node.textColor);

            this.buildLayer(node.children, childContainer);

            container.appendChild(nodeElement);
        }
    }
}

export { TreeDiagram };