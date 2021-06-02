var host = "https://localhost:44305/";
var apiPath = host + "api/";

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
    diagramItemDeletePath: apiPath + 'DiagramItemDelete',
    diagramItemSetMethodsPath: apiPath + 'DiagramItemSetMethods',
    relationAddPath: apiPath + 'RelationAdd',
    relationDeletePath: apiPath + 'RelationDelete',
}
