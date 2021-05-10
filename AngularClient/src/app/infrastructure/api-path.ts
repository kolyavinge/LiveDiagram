var host = "https://localhost:44305/";
var apiPath = host + "api/";

export default {
    host: host,
    getDiagramByIdPath: apiPath + 'getDiagramById',
    diagramItemMovePath: apiPath + 'diagramItemMove',
    diagramItemResizePath: apiPath + 'diagramItemResize',
    diagramItemSetTitlePath: apiPath + 'diagramItemSetTitle',
    diagramItemAddPath: apiPath + 'diagramItemAdd',
    diagramItemDeletePath: apiPath + 'diagramItemDelete',
    relationAddPath: apiPath + 'relationAdd',
    relationDeletePath: apiPath + 'relationDelete',
}
