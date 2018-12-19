export interface IStackSliderProps {
    className?: string;
    zDistance?: number;
    yDistance?: number;
    transitionDuration?: number;
    infiniteLoop?: boolean;
    dots?: boolean;
    slideWidth?: string;
    slideHeight?: string;
    onChange?: () => void;
    onPrevChange?: () => void;
    onNextChange?: () => void;
}

export interface IStackSliderSlide {
    translateX: number;
    translateY: number;
    translateZ: number;
    transition: string;
    rotateZ: number;
    zIndex: number;
    opacity: number;
    id: number;
}

export interface IStackSliderState {
    initX: number;
    transX: number;
    transY: number;
    rotZ: number;
    countSlides: number;
    currentActiveSlide: number;
    startMovingPosition: number;
    direction: 0 | 1 | -1;
    slides: IStackSliderSlide[];
}
