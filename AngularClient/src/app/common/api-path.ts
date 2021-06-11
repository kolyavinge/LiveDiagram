let host = "https://localhost:44305/";
let apiPath = host + "api/";

export default {
    host: host,
    getAvailableDiagramsPath: apiPath + 'GetAvailableDiagrams',
    getDiagramByIdPath: apiPath + 'GetDiagramById',
    diagramSetTitlePath: apiPath + 'DiagramSetTitle',
    diagramLayoutPath: apiPath + 'DiagramLayout',
    diagramItemMovePath: apiPath + 'DiagramItemMove',
    diagramItemResizePath: apiPath + 'DiagramItemResize',
    diagramItemSetTitlePath: apiPath + 'DiagramItemSetTitle',
    diagramItemAddPath: apiPath + 'DiagramItemAdd',
    diagramItemEditPath: apiPath + 'DiagramItemEdit',
    diagramItemDeletePath: apiPath + 'DiagramItemDelete',
    diagramItemSetMethodsPath: apiPath + 'DiagramItemSetMethods',
    relationAddPath: apiPath + 'RelationAdd',
    relationDeletePath: apiPath + 'RelationDelete',
    actionSetActivePath: apiPath + 'ActionSetActive',
}
