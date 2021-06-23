import { DiagramItem } from '../model/diagram-item';
import { Relation } from '../model/relation';
import { Diagram } from '../model/diagram';

export class DiagramLoader {

    makeDiagram(response): Diagram {
        let diagram = new Diagram(response.diagram.id);
        diagram.title = response.diagram.title;
        let items = (response.diagram.items ?? []).map(i => DiagramItem.makeFromObject(i));
        diagram.addItems(items);
        let relations = (response.diagram.relations ?? []).map(r => {
            let from = diagram.getItemById(r.itemIdFrom);
            let to = diagram.getItemById(r.itemIdTo);
            return Relation.makeWithItems(r.id, from, to);
        });
        diagram.addRelations(relations);

        return diagram;
    }
}
