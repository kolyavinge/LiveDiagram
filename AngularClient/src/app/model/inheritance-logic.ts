import { Diagram } from './diagram';
import { DiagramItem } from './diagram-item';
import { InheritanceTree } from './inheritance-tree';
import { Relation } from './relation';

export class InheritanceLogic {

    getAvailableParents(diagram: Diagram, item: DiagramItem): DiagramItem[] {
        let trees = InheritanceTree.fromDiagram(diagram);
        trees.forEach(tree => {
            let node = tree.findNodeFor(item);
            if (node) tree.deleteNode(node);
        });
        let allItems = trees.map(tree => tree.getAllDiagramItems()).reduce((x, y) => x.concat(y), []);
        return allItems;
    }

    getParentRelation(diagram: Diagram, item: DiagramItem): Relation {
        let parentRelations = diagram.getRelationsToItem(item);
        if (parentRelations.length > 0) {
            return parentRelations[0];
        } else {
            return null;
        }
    }

    getParent(diagram: Diagram, item: DiagramItem): DiagramItem {
        let parentRelations = diagram.getRelationsToItem(item);
        if (parentRelations.length > 0) {
            return parentRelations[0].from;
        } else {
            return null;
        }
    }
}
