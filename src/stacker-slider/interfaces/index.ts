export interface IStackerSliderProps {
    className?: string;
    zDistance?: number;
    yDistance?: number;
    transitionDuration?: number;
    infiniteLoop?: boolean;
    dots?: boolean;
    slideWidth?: string;
    slideHeight?: string;
    dotsColor?: string;
    dotsActiveColor?: string;
    onChange?: () => void;
    onPrevChange?: () => void;
    onNextChange?: () => void;
}

export interface IStackerSliderSlide {
    translateX: number;
    translateY: number;
    translateZ: number;
    transition: string;
    rotateZ: number;
    zIndex: number;
    opacity: number;
    id: number;
}

export interface IStackerSliderState {
    initX: number;
    currentTranslateX: number;
    currentTranslateY: number;
    currentRotateZ: number;
    countSlides: number;
    currentActiveSlide: number;
    startMovingPosition: number;
    direction: 0 | 1 | -1;
    slides: IStackerSliderSlide[];
}
