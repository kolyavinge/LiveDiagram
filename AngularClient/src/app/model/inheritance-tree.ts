import { Diagram } from "./diagram";
import { DiagramItem } from "./diagram-item";

export interface TreeNode {
    level: number;
    item: DiagramItem;
    parent: TreeNode;
    children: TreeNode[];
}

export class InheritanceTree {

    root: TreeNode;

    static fromDiagram(diagram: Diagram): InheritanceTree[] {
        var makeNode = (level: number, parent: TreeNode, item: DiagramItem): TreeNode => {
            var node = { level: level, item: item, parent: parent, children: [] };
            diagram.getRelationsFromItem(node.item).forEach(relation => {
                node.children.push(makeNode(level + 1, node, relation.to));
            });
            return node;
        };
        var rootItems = diagram.items.filter(i => diagram.getRelationsToItem(i).length == 0);
        var trees = rootItems.map(rootItem => {
            var tree = new InheritanceTree();
            tree.root = makeNode(0, null, rootItem);
            return tree;
        });

        return trees;
    }

    findNodeFor(item: DiagramItem): TreeNode {
        if (this.root == null) return null;
        var result: TreeNode = null;
        this.depth((node: TreeNode) => {
            if (node.item.isEquals(item)) {
                result = node;
                return false;
            }
            return true;
        });

        return result;
    }

    deleteNode(node: TreeNode): void {
        if (node.parent) {
            node.parent.children = node.parent.children.filter(c => c != node);
        } else {
            this.root = null;
        }
    }

    getAllNodes(): TreeNode[] {
        if (this.root == null) return [];
        var result = [];
        this.depth((node: TreeNode) => {
            result.push(node);
            return true;
        });

        return result;
    }

    getAllDiagramItems(): DiagramItem[] {
        if (this.root == null) return [];
        var result = [];
        this.depth((node: TreeNode) => {
            result.push(node.item);
            return true;
        });

        return result;
    }

    private depth(action): void {
        var rec = (node: TreeNode, action) => {
            var needToContinue = action(node);
            if (needToContinue == false) return false;
            for (var i = 0; i < node.children.length; i++) {
                if (rec(node.children[i], action) == false) return false;
            }
            return true;
        };
        rec(this.root, action);
    }
}
