interface ISlide {
    transitionDuration: number;
    translateX: number;
    translateY: number;
    translateZ: number;
    rotateZ: number;
}

export class SlideHelper {
    private transitionDuration: number = 0.4;
    private translateX: number = 0;
    private translateY: number = 0;
    private translateZ: number = 0;
    private rotateZ: number = 0;

    constructor(translateY: number, translateZ: number) {
        this.translateY = translateY;
        this.translateZ = translateZ;
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

    public getSliderInfo = (): ISlide => {
        return {
            transitionDuration: this.transitionDuration,
            translateX: this.translateX,
            translateY: this.translateY,
            translateZ: this.translateZ,
            rotateZ: this.rotateZ,
        };
    };
}
