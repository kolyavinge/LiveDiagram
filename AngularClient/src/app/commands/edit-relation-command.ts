import { Command } from '../common/command';
import { DiagramItem } from '../model/diagram-item';
import { DiagramService } from '../services/diagram.service';
import { DiagramEventsService } from '../services/diagram-events.service';
import { InheritanceLogic } from '../model/inheritance-logic';
import { EditDiagramItemResult } from '../contracts/edit-diagram-item-result';

export class EditRelationCommand extends Command {

    private _items: DiagramItem[] = [];

    constructor(
        private _diagramService: DiagramService,
        private _diagramEventsService: DiagramEventsService
    ) {
        super();
        let self = this;
        self._diagramEventsService.diagramItemSetSelectionEvent.addHandler((items: DiagramItem[]) => {
            if (items.length === 1) {
                self._items.push(items[0]);
            } else {
                self._items = [];
            }
        });
        self._diagramEventsService.diagramClearSelectionEvent.addHandler(() => {
            self._items = [];
        });
    }

    protected execInner(): void {
        let logic = new InheritanceLogic();
        let result: EditDiagramItemResult = {
            item: this._items[1],
            parentHasChanged: true,
            parentOld: logic.getParent(this._diagramService.diagram, this._items[1]),
            parentNew: this._items[0]
        };
        this._diagramEventsService.diagramItemEditEvent.raise(result);
    }

    get title(): string { return 'Наследовать'; }

    get isEnabled(): boolean {
        let result = this._items.length === 2;
        if (result) {
            let logic = new InheritanceLogic();
            let availableParents = logic.getAvailableParents(this._diagramService.diagram, this._items[1]);
            result = availableParents.some(parent => parent.isEquals(this._items[0]));
        }

        return result;
    }
}
