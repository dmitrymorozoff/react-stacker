export interface IStackSliderProps {
    zDistance: number;
    yDistance: number;
    transitionDuration: number;
}

export interface IStackSliderSlide {
    translateX: number;
    translateY: number;
    translateZ: number;
    transition: string;
    rotateZ: number;
    zIndex: number;
    opacity: number;
}

export interface IStackSliderState {
    initX: number;
    transX: number;
    transY: number;
    rotZ: number;
    countSlides: number;
    currentActiveSlide: number;
    slides: IStackSliderSlide[];
}
