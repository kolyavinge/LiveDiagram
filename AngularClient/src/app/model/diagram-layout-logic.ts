import { Point } from "./point";
import { Diagram } from "./diagram";
import { DiagramItem } from "./diagram-item";
import { InheritanceTree } from "./inheritance-tree";

export interface LayoutDiagramItemResult {
    item: DiagramItem;
    position: Point
}

export interface LayoutDiagramResult {
    items: LayoutDiagramItemResult[];
}

export class DiagramLayoutLogic {

    layoutDiagram(diagram: Diagram): LayoutDiagramResult {
        var trees = InheritanceTree.fromDiagram(diagram);
        var layoutItems = trees.map(tree => this.layoutTree(diagram, tree)).reduce((x, y) => x.concat(y), []);
        return { items: layoutItems };
    }

    private layoutTree(diagram: Diagram, tree: InheritanceTree): LayoutDiagramItemResult[] {
        var result: LayoutDiagramItemResult[] = [];
        var levelsCount = tree.getLevelsCount();
        for (var level = 0; level < levelsCount; level++) {
            var nodesFromLevel = tree.getNodesFromLevel(level);
            var dx = diagram.size.width / nodesFromLevel.length;
            var levelWidth = dx * (nodesFromLevel.length - 1) + nodesFromLevel[nodesFromLevel.length - 1].item.size.width;
            var xoffset = (diagram.size.width - levelWidth) / 2;
            var yoffset = 20;
            for (var i = 0; i < nodesFromLevel.length; i++) {
                var itemLayout = {
                    item: nodesFromLevel[i].item,
                    position: new Point(xoffset + dx * i, yoffset + level * 200)
                };
                result.push(itemLayout);
            }
        }

        return result;
    }
}
