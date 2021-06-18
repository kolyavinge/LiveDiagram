import { Diagram } from './diagram';
import { DiagramItem } from './diagram-item';

export interface TreeNode {
    level: number;
    item: DiagramItem;
    parent: TreeNode;
    children: TreeNode[];
}

export class InheritanceTree {

    root: TreeNode;

    static fromDiagram(diagram: Diagram): InheritanceTree[] {
        let makeNode = (level: number, parent: TreeNode, item: DiagramItem): TreeNode => {
            let node = { level: level, item: item, parent: parent, children: [] };
            diagram.getRelationsFromItem(node.item).forEach(relation => {
                node.children.push(makeNode(level + 1, node, relation.to));
            });
            return node;
        };
        let rootItems = diagram.items.filter(i => diagram.getRelationsToItem(i).length === 0);
        let trees = rootItems.map(rootItem => {
            let tree = new InheritanceTree();
            tree.root = makeNode(0, null, rootItem);
            return tree;
        });

        return trees;
    }

    findNodeFor(item: DiagramItem): TreeNode {
        if (this.root == null) return null;
        let result: TreeNode = null;
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
            node.parent.children = node.parent.children.filter(c => c !== node);
        } else {
            this.root = null;
        }
    }

    getAllNodes(): TreeNode[] {
        if (this.root == null) return [];
        let result = [];
        this.depth((node: TreeNode) => {
            result.push(node);
            return true;
        });

        return result;
    }

    getAllDiagramItems(): DiagramItem[] {
        if (this.root == null) return [];
        let result = [];
        this.depth((node: TreeNode) => {
            result.push(node.item);
            return true;
        });

        return result;
    }

    getLevelsCount(): number {
        if (this.root == null) return 0;
        let maxLevel = 0;
        this.depth((node: TreeNode) => {
            maxLevel = Math.max(node.level, maxLevel);
            return true;
        });

        return maxLevel + 1; // levels count
    }

    getNodesFromLevel(level: number): TreeNode[] {
        if (this.root == null) return [];
        let result = [];
        this.depth((node: TreeNode) => {
            if (node.level === level) {
                result.push(node);
            }
            return true;
        });

        return result;
    }

    private depth(action): void {
        let rec = (node: TreeNode) => {
            let needToContinue = action(node);
            if (needToContinue === false) return false;
            for (let child of node.children) {
                if (rec(child) === false) return false;
            }
            return true;
        };
        rec(this.root);
    }
}
