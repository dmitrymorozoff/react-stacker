import filter from "lodash-es/filter";
import * as React from "react";
import { ISlideProps } from "./components/stack-slide/index";
import { StackWrapper } from "./components/stack-wrapper";
import { deepClone } from "./utils/deep-clone";
import { shiftArray } from "./utils/shift-array";

interface IProps {
    zDistance: number;
    yDistance: number;
}

interface ISlide {
    translateX: number;
    translateY: number;
    translateZ: number;
    rotateZ: number;
    zIndex: number;
}

interface IState {
    initX: number;
    transX: number;
    transY: number;
    rotZ: number;
    countSlides: number;
    currentActiveSlide: number;
    slides: ISlide[];
}

export class StackSlider extends React.PureComponent<IProps, IState> {
    public static defaultProps: Partial<IProps> = {
        zDistance: 50,
        yDistance: 30,
    };
    private refCurrentSlide: any;

    constructor(props: IProps) {
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
        let countSlides = 0;
        React.Children.forEach(this.props.children, (child: React.ReactElement<ISlideProps>) => {
            if (child.props.isSlide) {
                countSlides++;
            }
        });

        const { zDistance, yDistance } = this.props;
        let currentYDistance = 0;
        let currentZDistance = 0;
        const slides = [];
        for (let i = countSlides - 1; i >= 0; i--) {
            const slideSetting = {
                translateX: 0,
                translateY: currentYDistance,
                translateZ: currentZDistance,
                rotateZ: 0,
                zIndex: i,
            };

            slides[i] = slideSetting;
            currentYDistance += yDistance;
            currentZDistance -= zDistance;
        }
        this.setState({
            slides: [...slides],
            countSlides,
            currentActiveSlide: countSlides - 1,
        });
    }

    public getEnhanceChildrens = () => {
        const { children } = this.props;
        const { countSlides } = this.state;
        const childrenArray: any = [...React.Children.toArray(children)];
        const childrenWithProps: any = [];

        for (let i = 0; i < countSlides; i++) {
            const { translateX, translateY, translateZ, zIndex } = this.state.slides[i];
            const slide = React.cloneElement(childrenArray[i], {
                onMouseDown: this.setEventOnFirstSlide(i),
                setRef: this.setCurrentSlideRef(i),
                style: {
                    zIndex,
                    transform: `translateX(${translateX}px) translateY(${translateY}px)  translateZ(${translateZ}px)`,
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

        const newSlides: ISlide[] = deepClone(slides);

        newSlides[currentActiveSlide].translateX = newTransX;
        newSlides[currentActiveSlide].translateY = newTransY;
        newSlides[currentActiveSlide].rotateZ = newRotZ;

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
            this.handleMouseUp(event);
            this.refCurrentSlide = null;
            this.updateSlidesSettings();
            return;
        }
    };

    public updateSlidesSettings = () => {
        const { slides }: any = this.state;

        const newSlides: ISlide[] = deepClone(slides);
        shiftArray(newSlides, 1);

        this.setState({
            slides: [...newSlides],
            currentActiveSlide: this.state.currentActiveSlide - 1,
        });

        document.removeEventListener("mouseup", this.handleMouseUp, false);
    };

    public handleMouseUp = (event: MouseEvent) => {
        event.preventDefault();
        const newTranslateX = 0;
        const newTranslateY = 0;
        const newRotateZ = 0;
        const { currentActiveSlide, countSlides, slides } = this.state;

        const newSlides: ISlide[] = [];
        for (let i = 0; i < countSlides; i++) {
            const newObject = JSON.parse(JSON.stringify(slides[i]));
            newSlides.push(newObject);
        }

        newSlides[currentActiveSlide].translateX = newTranslateX;
        newSlides[currentActiveSlide].translateY = newTranslateY;
        newSlides[currentActiveSlide].rotateZ = newRotateZ;

        const { yDistance, zDistance } = this.props;
        let count = 1;

        for (let j = countSlides - 2; j >= 0; j--) {
            let indexElement = j - (countSlides - 1 - currentActiveSlide);

            if (indexElement < 0) {
                indexElement = countSlides - Math.abs(indexElement);
            }
            newSlides[indexElement].translateX = newTranslateX;
            newSlides[indexElement].translateY = yDistance * count;
            newSlides[indexElement].translateZ = -zDistance * count;
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
        return <StackWrapper>{this.getEnhanceChildrens()}</StackWrapper>;
    }
}
