interface ISlide {
    transitionDuration: number;
    translateX: number;
    translateY: number;
    translateZ: number;
    rotateZ: number;
    zIndex: number;
    id: number;
}

export class SlideHelper {
    private transitionDuration: number = 0.4;
    private translateX: number = 0;
    private translateY: number = 0;
    private translateZ: number = 0;
    private rotateZ: number = 0;
    private zIndex: number = 0;
    private id: number;

    constructor(translateY: number, translateZ: number, zIndex: number, id: number) {
        this.translateY = translateY;
        this.translateZ = translateZ;
        this.zIndex = zIndex;
        this.id = id;
    }

    public setTransitionDuration = (value: number) => {
        this.transitionDuration = value;
    };

    public setTranslateX = (value: number) => {
        this.translateX = value;
    };

    public setTranslateY = (value: number) => {
        this.translateY = value;
    };

    public setTranslateZ = (value: number) => {
        this.translateZ = value;
    };

    public setRotateZ = (value: number) => {
        this.rotateZ = value;
    };

    public setZIndex = (value: number) => {
        this.zIndex = value;
        console.log("zIndex", value);
    };

    public getSliderInfo = (): ISlide => {
        return {
            transitionDuration: this.transitionDuration,
            translateX: this.translateX,
            translateY: this.translateY,
            translateZ: this.translateZ,
            rotateZ: this.rotateZ,
            zIndex: this.zIndex,
            id: this.id,
        };
    };
}
