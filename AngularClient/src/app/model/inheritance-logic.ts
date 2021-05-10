import { Diagram } from "./diagram";
import { DiagramItem } from "./diagram-item";
import { InheritanceTree } from "./inheritance-tree";
import { Relation } from "./relation";

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

    getParentRelation(diagram: Diagram, item: DiagramItem): Relation {
        var parentRelations = diagram.getRelationsToItem(item);
        if (parentRelations) {
            return parentRelations[0];
        } else {
            return null;
        }
    }

    getParent(diagram: Diagram, item: DiagramItem): DiagramItem {
        var parentRelations = diagram.getRelationsToItem(item);
        if (parentRelations) {
            return parentRelations[0].from;
        } else {
            return null;
        }
    }
}
