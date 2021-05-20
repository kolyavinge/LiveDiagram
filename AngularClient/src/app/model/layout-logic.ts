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

export class LayoutLogic {

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

    getInitialItemPosition(diagram: Diagram, item: DiagramItem, parent: DiagramItem): Point {
        var startX = parent ? parent.position.x + parent.size.width / 2 : diagram.size.width / 2;
        var startY = parent ? parent.position.y + parent.size.height + 50 : 20;
        var x = this.getFreeX(diagram, startX, startY);
        if (x == 0) {
            startY += 50;
            x = startX + 50;
        }
        return new Point(x - item.size.width / 2, startY);
    }

    private getFreeX(diagram: Diagram, startX: number, startY: number): number {
        var stack = [];
        stack.push(startX);
        while (stack.length > 0) {
            var x = stack.shift();
            if (x <= 0) continue;
            if (x >= diagram.size.width) continue;
            var point = new Point(x, startY);
            var matched = diagram.getMatchedItems(point);
            if (matched.length == 0) {
                return x;
            } else {
                stack.push(x - 2 * matched[0].size.width);
                stack.push(x + 2 * matched[0].size.width);
            }
        }

        return 0;
    }
}
