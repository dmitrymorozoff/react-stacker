import * as React from "react";
// import { StackLeftArrow, StackRightArrow } from "./components/stack-arrows/index";
import { StackPagination } from "./components/stack-pagination/index";
import { ISlideProps } from "./components/stack-slide/index";
import { StackWrapper } from "./components/stack-wrapper";
import { IStackSliderProps, IStackSliderSlide, IStackSliderState } from "./interfaces";
import { deepClone } from "./utils/deep-clone";
import { shiftArray } from "./utils/shift-array";

export class StackSlider extends React.PureComponent<IStackSliderProps, IStackSliderState> {
    public static defaultProps: Partial<IStackSliderProps> = {
        zDistance: 50,
        yDistance: 30,
        transitionDuration: 0.4,
    };
    private refCurrentSlide: any;

    constructor(props: IStackSliderProps) {
        super(props);
        this.state = {
            countSlides: 0,
            currentActiveSlide: 0,
            slides: [],
            initX: 0,
            transX: 0,
            transY: 0,
            rotZ: 0,
        };

        this.refCurrentSlide = React.createRef();
    }

    public componentWillMount() {
        const countSlides = this.getCountSlides();
        const { zDistance, yDistance } = this.props;

        let currentYDistance = 0;
        let currentZDistance = 0;
        let opacity = 1;
        const stepOpacity = 0.5 / (countSlides - 1);
        const slides = [];

        for (let i = countSlides - 1; i >= 0; i--) {
            const slideSetting: IStackSliderSlide = {
                transition: "none",
                translateX: 0,
                translateY: currentYDistance,
                translateZ: currentZDistance,
                rotateZ: 0,
                zIndex: i,
                opacity,
            };

            slides[i] = slideSetting;
            currentYDistance += yDistance;
            currentZDistance -= zDistance;
            opacity -= stepOpacity;
        }

        this.setState({
            slides: [...slides],
            countSlides,
            currentActiveSlide: countSlides - 1,
        });
    }

    public getCountSlides = (): number => {
        let countSlides = 0;
        React.Children.forEach(this.props.children, (child: React.ReactElement<ISlideProps>) => {
            if (child.props.isSlide) {
                countSlides++;
            }
        });
        return countSlides;
    };

    public getEnhanceChildrens = () => {
        const { children } = this.props;
        const { countSlides, currentActiveSlide } = this.state;
        const childrenArray: any = [...React.Children.toArray(children)];
        const childrenWithProps: any = [];

        for (let i = 0; i < countSlides; i++) {
            const {
                translateX,
                translateY,
                translateZ,
                transition,
                zIndex,
                opacity,
                rotateZ,
            } = this.state.slides[i];

            const slide = React.cloneElement(childrenArray[i], {
                onMouseDown: this.setEventOnFirstSlide(i),
                setRef: this.setCurrentSlideRef(i),
                style: {
                    opacity,
                    zIndex,
                    transform: `translateX(${translateX}px) translateY(${translateY}px) translateZ(${translateZ}px) rotateZ(${rotateZ}deg)`,
                    transition,
                    cursor: i === currentActiveSlide ? "grab" : "default",
                },
            });

            childrenWithProps[i] = slide;
        }

        return childrenWithProps;
    };

    public setEventOnFirstSlide = (slideIndex: number) => {
        const { currentActiveSlide } = this.state;
        return slideIndex === currentActiveSlide ? this.handleMouseDown : undefined;
    };

    public setCurrentSlideRef = (slideIndex: number) => {
        const { currentActiveSlide } = this.state;
        return slideIndex === currentActiveSlide
            ? (ref: HTMLElement) => {
                  this.refCurrentSlide = ref;
              }
            : null;
    };

    public handleMouseDown = (event: MouseEvent) => {
        event.preventDefault();

        this.setState({
            initX: event.pageX,
        });

        document.addEventListener("mousemove", this.handleMouseMove, false);
        document.addEventListener("mouseup", this.handleMouseUp, false);
    };

    public handleMouseMove = (event: MouseEvent) => {
        const { currentActiveSlide, countSlides, slides } = this.state;
        const mouseX = event.pageX;
        const newTransX = this.state.transX + (mouseX - this.state.initX);
        const newTransY = -Math.abs(newTransX / 15);
        const newRotZ = newTransX / 20;

        const newSlides: IStackSliderSlide[] = deepClone(slides);

        newSlides[currentActiveSlide].translateX = newTransX;
        newSlides[currentActiveSlide].translateY = newTransY;
        newSlides[currentActiveSlide].rotateZ = newRotZ;
        newSlides[currentActiveSlide].transition = "none";

        const { yDistance, zDistance } = this.props;
        let count = 1;

        for (let j = countSlides - 2; j >= 0; j--) {
            let indexElement = j - (countSlides - 1 - currentActiveSlide);

            if (indexElement < 0) {
                indexElement = countSlides - Math.abs(indexElement);
            }

            newSlides[indexElement].translateX = newTransX / (2 * count);
            newSlides[indexElement].translateY = yDistance * count;
            newSlides[indexElement].translateZ = -zDistance * count;
            newSlides[indexElement].transition = "none";
            newSlides[indexElement].rotateZ = newRotZ / (2 * count);
            count++;
        }

        this.setState({
            slides: [...newSlides],
            transX: newTransX,
            transY: newTransY,
            rotZ: newRotZ,
            initX: mouseX,
        });
        event.preventDefault();

        if (Math.abs(newTransX) >= this.refCurrentSlide.offsetWidth - 30) {
            this.refCurrentSlide.style.transition = "ease 0.2s";
            this.refCurrentSlide.style.opacity = 0;
            this.handleMouseUp(event);
            setTimeout(() => {
                this.refCurrentSlide.style.transition = "none";
                this.refCurrentSlide.style.opacity = "1";
                this.updateSlidesSettings();
            }, 200);
            return;
        }
    };

    public updateSlidesSettings = () => {
        const { slides }: IStackSliderState = this.state;
        const newSlides: IStackSliderSlide[] = deepClone(slides);
        shiftArray(newSlides, 1);
        const nextCurrentActiveSlide = this.getNextCurrentSlide();

        this.setState({
            slides: [...newSlides],
            currentActiveSlide: nextCurrentActiveSlide,
        });

        document.removeEventListener("mouseup", this.handleMouseUp, false);
    };

    public getNextCurrentSlide = () => {
        const { countSlides, currentActiveSlide }: IStackSliderState = this.state;

        let nextCurrentActiveSlide = currentActiveSlide - 1;
        if (nextCurrentActiveSlide < 0) {
            nextCurrentActiveSlide = countSlides - 1;
        }

        return nextCurrentActiveSlide;
    };

    public handleMouseUp = (event: MouseEvent) => {
        event.preventDefault();
        const newTranslateX = 0;
        const newTranslateY = 0;
        const newRotateZ = 0;
        const { currentActiveSlide, countSlides, slides } = this.state;

        const newSlides: IStackSliderSlide[] = [];
        for (let i = 0; i < countSlides; i++) {
            const newObject = JSON.parse(JSON.stringify(slides[i]));
            newSlides.push(newObject);
        }

        const { yDistance, zDistance, transitionDuration } = this.props;
        const timing = "0.075, 0.82, 0.165, 1";

        newSlides[currentActiveSlide].translateX = newTranslateX;
        newSlides[currentActiveSlide].translateY = newTranslateY;
        newSlides[currentActiveSlide].transition = `cubic-bezier(${timing}) ${transitionDuration}s`;
        newSlides[currentActiveSlide].rotateZ = newRotateZ;

        let count = 1;
        for (let j = countSlides - 2; j >= 0; j--) {
            let indexElement = j - (countSlides - 1 - currentActiveSlide);

            if (indexElement < 0) {
                indexElement = countSlides - Math.abs(indexElement);
            }
            newSlides[indexElement].translateX = newTranslateX;
            newSlides[indexElement].translateY = yDistance * count;
            newSlides[indexElement].translateZ = -zDistance * count;
            newSlides[indexElement].transition = `cubic-bezier(${timing}) ${transitionDuration /
                (count + 0.9)}s`;
            newSlides[indexElement].rotateZ = newRotateZ;
            count++;
        }

        this.setState({
            transX: newTranslateX,
            transY: newTranslateY,
            rotZ: newRotateZ,
            slides: [...newSlides],
        });

        document.removeEventListener("mousemove", this.handleMouseMove, false);
    };

    public render() {
        const { countSlides, currentActiveSlide } = this.state;
        return (
            <StackWrapper>
                {this.getEnhanceChildrens()}
                {/* <StackLeftArrow />
                <StackRightArrow /> */}
                <StackPagination countSlides={countSlides} activeSlide={currentActiveSlide} />
            </StackWrapper>
        );
    }
}
