import { TreeDiagram } from "./tree-diagram.js";

class Vec2{
    constructor(x, y){
        this.x = x; this.y = y;
        this.length = (this.x**2 + this.y**2)**(0.5);
        this.unit = [this.x/this.length, this.y/this.length];
    }
    angle(){
        // (0, -1)。(this.x, this.y) = 0*this.x + -1*this.y = -this.y
        let cos = -this.y / this.length;
        let deg = Math.floor(Math.acos(cos) * (180/Math.PI));
        return ((this.x>0) ? deg : 360-deg)%360;
    }
}

class Skilltree {
    constructor(IDselector, configuration){
        this.locked = false;
        this.targetActiveDegree = 180;
        this.trees = [];

        this.configuration = configuration;

        this.skilltree = document.getElementById(IDselector);
        this.skilltree.style.setProperty("--size", configuration.size);
        this.skilltree.style.setProperty("--background-color", configuration.backgroundColor);
        this.buildBranches(configuration.branches);

        this.skilltree.addEventListener("mouseover", (e)=>{
            this.locked = false;
            this.skilltreeHoverFuncion(e);
            this.skilltree.addEventListener("mousemove", this.skilltreeHoverFuncion);
        });
        this.skilltree.addEventListener("mouseleave", (e)=>{
            this.locked = false;
            this.skilltreeHoverFuncion(e);
            this.skilltree.removeEventListener("mousemove", this.skilltreeHoverFuncion);
        });
    }
    buildBranches = (branches)=>{
        for(let i=0; i<branches.length; i++){
            let branch = document.createElement("div");
            branch.id = branches[i].name;
            branch.classList.add("branch");
            branch.dataset.id = i+1;
            branch.style.setProperty("--display-color", branches[i].displayColor);

            let tree = document.createElement("div");
            tree.id = branches[i].name;
            tree.classList.add("tree");
            branch.appendChild(tree);
            this.skilltree.appendChild(branch);

            this.trees.push(new TreeDiagram(tree, branches[i].tree));
        }
        this.branches = this.skilltree.querySelectorAll(".branch");
        this.branches.forEach((branch, idx) => {
            let unitDegree = 360/this.branches.length;
            this.trees[idx].diagram.style.setProperty("--rotate-degree", unitDegree/2);
            branch.style.setProperty("--mass-degree", unitDegree);
            branch.style.setProperty("--rotate-degree", unitDegree * idx);
        });
        this.skilltree.addEventListener("click", (e)=>{
            let rectData = this.skilltree.getBoundingClientRect();
            let mousepos = [e.clientX-rectData.left, e.clientY-rectData.top];
            let center = [(rectData.width/2), (rectData.height/2)];
            let vector = new Vec2(mousepos[0]-center[0], mousepos[1]-center[1]);
            let mouseAngle = vector.angle();
            let hovered = vector.length <= ((rectData.width/2) + (rectData.height/2))/2;
            let hoveredIndex = Math.floor( mouseAngle/(360 /this.branches.length) );
            if( !hovered ) return;

            if( !this.locked ){
                let locking = this.branches[hoveredIndex], foundLocking = false;
                let lockedUnitDegree = 180/(this.branches.length-1);
                locking.style.setProperty("--mass-degree", 180);
                locking.style.setProperty("--rotate-degree", -90);
                this.trees[hoveredIndex].diagram.style.setProperty("--rotate-degree", 90);
                this.updateTrees();
                for(let i=0; i<this.branches.length; i++){
                    if(i == hoveredIndex){
                        foundLocking = true;
                        continue;
                    }else{
                        this.branches[i].style.setProperty("--mass-degree", lockedUnitDegree);
                        this.branches[i].style.setProperty("--rotate-degree", 90 + (lockedUnitDegree*(i-foundLocking)));
                        this.trees[i].diagram.style.setProperty("--rotate-degree", lockedUnitDegree/2);
                        this.updateTrees();
                    }
                }
                this.skilltree.removeEventListener("mousemove", this.skilltreeHoverFuncion);
            }else{
                this.skilltreeHoverFuncion(e);
                this.skilltree.addEventListener("mousemove", this.skilltreeHoverFuncion);
            }
            this.locked = !this.locked;
        })
        this.updateTrees();
    }
    skilltreeHoverFuncion = (e)=>{
        let rectData = this.skilltree.getBoundingClientRect();
        let mousepos = [e.clientX-rectData.left, e.clientY-rectData.top];
        let center = [(rectData.width/2), (rectData.height/2)];
        let vector = new Vec2(mousepos[0]-center[0], mousepos[1]-center[1]);
        let mouseAngle = vector.angle();
        let hovered = vector.length <= ((rectData.width/2) + (rectData.height/2))/2;
        let normalDegree = 360 / this.branches.length;
        this.skilltree.dataset.name = "SKILLS";
        for(let i=0; i<this.branches.length; i++){
            let branch = this.branches[i];
            branch.style.zIndex = 0;
            branch.classList.remove("active");
            branch.style.setProperty("--mass-degree", normalDegree);
            branch.style.setProperty("--rotate-degree", normalDegree * i);
            this.trees[i].diagram.style.setProperty("--rotate-degree", normalDegree/2);
            this.updateTrees();
        }
        if( !hovered ) return;

        let targetNormalDegree = (360-(this.targetActiveDegree*hovered)) / (this.branches.length-hovered);
        let hoveredIndex = Math.floor( mouseAngle/(360 /this.branches.length) );
        let extraDegree = ( this.targetActiveDegree - (360/this.branches.length) ) / 2;

        var branchName = `${this.branches[hoveredIndex].id}`; 
        branchName = branchName.toUpperCase();
        this.skilltree.dataset.name = branchName;

        for(let i=hoveredIndex; i<hoveredIndex+this.branches.length; i++){
            let index = i%this.branches.length;
            let branch = this.branches[index];
            let originalRotateDegree = parseFloat(branch.style.getPropertyValue("--rotate-degree"));
            branch.style.zIndex = (index==hoveredIndex);
            branch.classList[ (index==hoveredIndex) ? "add" : "remove" ]("active");
            branch.style.setProperty("--mass-degree", (index==hoveredIndex) ? this.targetActiveDegree : targetNormalDegree);
            if( index == hoveredIndex ){
                branch.style.setProperty("--rotate-degree", originalRotateDegree - extraDegree);
            }else{
                let lastBranch = this.branches[(index-1+this.branches.length) % this.branches.length];
                let lastBranchMassDegree = parseFloat(lastBranch.style.getPropertyValue("--mass-degree"));
                let lastBranchRotateDegree = parseFloat(lastBranch.style.getPropertyValue("--rotate-degree"));
                branch.style.setProperty("--rotate-degree", lastBranchRotateDegree+lastBranchMassDegree);
            }
            let massDegree = parseFloat(branch.style.getPropertyValue("--mass-degree"));
            this.trees[index].diagram.style.setProperty("--rotate-degree", massDegree/2);
            this.updateTrees();
        }
    }
    updateTrees = ()=>{
        let defaultMassDegree = 360 / this.branches.length;
        for(let i=0; i<this.branches.length; i++){
            let massDegree = parseFloat(this.branches[i].style.getPropertyValue("--mass-degree"));
            this.trees[i].diagram.style.setProperty("--size-ratio", massDegree / defaultMassDegree);
            let rotateDegree = parseFloat(this.trees[i].diagram.style.getPropertyValue("--rotate-degree"));
            let diagramSin = Math.sin( rotateDegree * Math.PI / 180);
            let diagramCos = Math.cos( rotateDegree * Math.PI / 180);
            let diagramSiz = [this.trees[i].diagram.clientWidth, this.trees[i].diagram.clientHeight];
            this.trees[i].diagram.style.top   = `${ ((this.configuration.size*0.5)*(1-diagramCos))- diagramSiz[1]    }px`;
            this.trees[i].diagram.style.right = `${ ((this.configuration.size*0.5)*(1-diagramSin))-(diagramSiz[0]/2) }px`;
        }
    }
}



export { Skilltree };