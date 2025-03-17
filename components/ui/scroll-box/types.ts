export interface IAxisDataElementX {
    click: number;
    scrollLeft: number;
    scrollbarSize: number;
    offsetAttr: "left";
    clientAttr: "clientX";
    offsetSizeAttr: "offsetWidth";
    scrollSizeAttr: "scrollWidth";
    scrollOffsetAttr: "scrollLeft";
}

export interface IAxisDataElementY {
    click: number;
    scrollTop: number;
    scrollbarSize: number;
    offsetAttr: "top";
    clientAttr: "clientY";
    offsetSizeAttr: "offsetHeight";
    scrollSizeAttr: "scrollHeight";
    scrollOffsetAttr: "scrollTop";
}

export interface IAxisData {
    x: IAxisDataElementX;
    y: IAxisDataElementY;
}
