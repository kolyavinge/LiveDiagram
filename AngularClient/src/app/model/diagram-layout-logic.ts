import { Point } from "../common/point";
import { Diagram } from "./diagram";
import { DiagramItemState } from "./diagram-item";
import { InheritanceTree } from "./inheritance-tree";

export interface LayoutDiagramResult {
    items: DiagramItemState[];
}

export class DiagramLayoutLogic {

    layoutDiagram(diagram: Diagram): LayoutDiagramResult {
        let trees = InheritanceTree.fromDiagram(diagram);
        let layoutItems = trees.map(tree => this.layoutTree(diagram, tree)).reduce((x, y) => x.concat(y), []);
        return { items: layoutItems };
    }

    private layoutTree(diagram: Diagram, tree: InheritanceTree): DiagramItemState[] {
        let result: DiagramItemState[] = [];
        let levelsCount = tree.getLevelsCount();
        for (let level = 0; level < levelsCount; level++) {
            let nodesFromLevel = tree.getNodesFromLevel(level);
            let dx = diagram.size.width / nodesFromLevel.length;
            let levelWidth = dx * (nodesFromLevel.length - 1) + nodesFromLevel[nodesFromLevel.length - 1].item.size.width;
            let xoffset = (diagram.size.width - levelWidth) / 2;
            let yoffset = 20;
            for (let i = 0; i < nodesFromLevel.length; i++) {
                let itemLayout = {
                    item: nodesFromLevel[i].item,
                    position: new Point(xoffset + dx * i, yoffset + level * 200)
                };
                result.push(itemLayout);
            }
        }

        return result;
    }
}
