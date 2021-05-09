import { Diagram } from "./diagram";
import { DiagramItem } from "./diagram-item";
import { InheritanceTree } from "./inheritance-tree";

export class InheritanceLogic {

    getAvailableParents(diagram: Diagram, item: DiagramItem): DiagramItem[] {
        var trees = InheritanceTree.fromDiagram(diagram);
        trees.forEach(tree => {
            var node = tree.findNodeFor(item);
            if (node) tree.deleteNode(node);
        });
        var allItems = trees.map(tree => tree.getAllDiagramItems()).reduce((x, y) => x.concat(y), []);
        return allItems;
    }
}
