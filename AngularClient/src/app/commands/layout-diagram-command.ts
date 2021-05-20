import { Diagram } from "../model/diagram";
import { LayoutLogic } from "../model/layout-logic";

export class LayoutDiagramCommand {

    exec(diagram: Diagram): void {
        var layoutLogic = new LayoutLogic();
        var result = layoutLogic.layoutDiagram(diagram);
        result.items.forEach(layoutItem => {
            diagram.moveItemTo(layoutItem.item, layoutItem.position.x, layoutItem.position.y);
        });
    }
}
