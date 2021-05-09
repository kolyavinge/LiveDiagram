import { Diagram } from "./diagram";
import { DiagramItem } from "./diagram-item";

export interface TreeNode {
    item: DiagramItem;
    parent: TreeNode;
    children: TreeNode[];
}

export class InheritanceTree {

    root: TreeNode;

    static fromDiagram(diagram: Diagram): InheritanceTree[] {
        var makeNode = (parent: TreeNode, item: DiagramItem): TreeNode => {
            var node = { item: item, parent: parent, children: [] };
            diagram.getRelationsFromItem(node.item).forEach(relation => {
                node.children.push(makeNode(node, relation.to));
            });
            return node;
        };
        var rootItems = diagram.items.filter(i => diagram.getRelationsToItem(i).length == 0);
        var trees = rootItems.map(rootItem => {
            var tree = new InheritanceTree();
            tree.root = makeNode(null, rootItem);
            return tree;
        });

        return trees;
    }

    findNodeFor(item: DiagramItem): TreeNode {
        if (this.root == null) return null;
        var nodes = [this.root];
        while (nodes.length > 0) {
            var node = nodes.pop();
            if (node.item.isEquals(item)) {
                return node;
            } else {
                node.children.forEach(c => nodes.push(c));
            }
        }

        return null;
    }

    deleteNode(node: TreeNode): void {
        if (node.parent) {
            node.parent.children = node.parent.children.filter(c => c != node);
        } else {
            this.root = null;
        }
    }

    getAllDiagramItems(): DiagramItem[] {
        if (this.root == null) return [];
        var result = [];
        var depth = (node: TreeNode) => {
            result.push(node.item);
            node.children.forEach(c => depth(c));
        };
        depth(this.root);

        return result;
    }
}
