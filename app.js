import { Skilltree } from "./skilltree.js";
import { skilltreeData } from './data.js';


var skilltree;
document.addEventListener("DOMContentLoaded", ()=>{
    skilltree = new Skilltree("skilltree", skilltreeData);
});