import { Point } from "./point";
import { Diagram } from "./diagram";
import { DiagramItem } from "./diagram-item";

export class DiagramItemLayoutLogic {

    getInitialItemPosition(diagram: Diagram, item: DiagramItem, parent: DiagramItem): Point {
        let startX = parent ? parent.position.x + parent.size.width / 2 : diagram.size.width / 2;
        let startY = parent ? parent.position.y + parent.size.height + 50 : 20;
        let x = this.getFreeX(diagram, startX, startY);
        if (x == 0) {
            startY += 50;
            x = startX + 50;
        }
        return new Point(x - item.size.width / 2, startY);
    }

    private getFreeX(diagram: Diagram, startX: number, startY: number): number {
        let stack = [];
        stack.push(startX);
        while (stack.length > 0) {
            let x = stack.shift();
            if (x <= 0) continue;
            if (x >= diagram.size.width) continue;
            let point = new Point(x, startY);
            let matched = diagram.getMatchedItems(point);
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
