const size = 400;

const skilltreeData = {
    "branches": [{
            "name": "fighting",
            "displayColor":"#4527c3",
            "tree":{
                "nodeSize": `${ size*0.0325 }`,
                "lineColor":"#ffffff",
                "nodeColor":"#4527c3",
                "nodes": [{
                    "children": [{
                        "children": [{
                            "children": []
                        }]
                    },{
                        "children": [{
                            "children": [{
                                "children": []
                            }]
                        }]
                    }]
                },{
                    "children": [{
                        "children": [{
                            "children": [{
                                "children": []
                            },{
                                "children": []
                            }]
                        }]
                    }]
                },{
                    "children": [{
                        "children": [{
                            "children": [{
                                "children": []
                            }]
                        }]
                    },{
                        "children": [{
                            "children": [{
                                "children": []
                            }]
                        }]
                    }]
                }]
            }
        },{
            "name": "crafting",
            "displayColor":"#f68c5e",
            "tree":{
                "nodeSize": `${ size*0.0325 }`,
                "lineColor":"#ffffff",
                "nodeColor":"#f68c5e",
                "nodes": [{
                    "children": [{
                        "children": [{
                            "children": [{
                                "children": []
                            }]
                        }]
                    },{
                        "children": [{
                            "children": []
                        }]
                    },{
                        "children": [{
                            "children": [{
                                "children": []
                            }]
                        }]
                    }]
                }]
            }
        },{
            "name": "driving",
            "displayColor":"#d2509b",
            "tree":{
                "nodeSize": `${ size*0.0325 }`,
                "lineColor":"#ffffff",
                "nodeColor":"#d2509b",
                "nodes": [{
                    "children": [{
                        "children": [{
                            "children": [{
                                "children": []
                            }]
                        },{
                            "children": [{
                                "children": []
                            }]
                        }]
                    }]
                }]
            }
        },{
            "name": "hacking",
            "displayColor":"#27cbb8",
            "tree":{
                "nodeSize": `${ size*0.0325 }`,
                "lineColor":"#ffffff",
                "nodeColor":"#27cbb8",
                "nodes": [{
                    "children": [{
                        "children": [{
                            "children": [{
                                "children": []
                            }]
                        }]
                    },{
                        "children": [{
                            "children": [{
                                "children": []
                            }]
                        }]
                    }]
                },{
                    "children": [{
                        "children": [{
                            "children": [{
                                "children": []
                            }]
                        },{
                            "children": [{
                                "children": [{
                                    "children": []
                                }]
                            }]
                        },{
                            "children": [{
                                "children": []
                            }]
                        }]
                    }]
                },{
                    "children": [{
                        "children": [{
                            "children": []
                        }]
                    },{
                        "children": [{
                            "children": []
                        }]
                    }]
                }]
            }
        }], "backgroundColor": "#cccccc", "size": size
}

export { skilltreeData };