import * as React from "react";
import { ISlideProps } from "./components/stack-slide/index";
import { StackWrapper } from "./components/stack-wrapper";
import { SlideHelper } from "./utils/slide-helper";
import { array } from "prop-types";

interface IProps {
    zDistance: number;
    yDistance: number;
}

interface IState {
    initX: number | null;
    mouseX: number | null;
    translateX: number | null;
    translateY: number | null;
    rotateZ: number | null;
    currentSlide: number | null;
    prevSlide: number | null;
    countSlides: number | null;
}

export class StackSlider extends React.PureComponent<IProps, IState> {
    public static defaultProps: Partial<IProps> = {
        zDistance: 50,
        yDistance: 30,
    };
    private slides: SlideHelper[] = [];
    private refCurrentSlide: any;

    constructor(props: IProps) {
        super(props);
        this.state = {
            initX: null,
            mouseX: null,
            translateX: 0,
            translateY: 0,
            rotateZ: 0,
            currentSlide: 0,
            prevSlide: null,
            countSlides: 0,
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

        for (let i = countSlides - 1; i >= 0; i--) {
            this.slides[i] = new SlideHelper(currentYDistance, currentZDistance, i, i);

            currentYDistance += yDistance;
            currentZDistance -= zDistance;
        }
        this.setState({
            currentSlide: countSlides - 1,
            countSlides,
        });
    }

    public getEnhanceChildrens = () => {
        const { children } = this.props;

        const childrenArray: any = React.Children.toArray(children);
        const childrenWithProps: any = [];
        for (let i = 0; i < this.slides.length; i++) {
            const { translateX, translateY, translateZ, zIndex } = this.slides[i].getSliderInfo();
            const slide = React.cloneElement(childrenArray[i], {
                onMouseDown: this.setEventOnFirstSlide(i),
                setRef: this.setCurrentSlideRef(i),
                isSlide: false,
                style: {
                    zIndex,
                    transform: `translateZ(${translateZ}px) translateY(${translateY}px) translateX(${translateX}px)`,
                },
            });
            childrenWithProps[i] = slide;
        }

        return childrenWithProps;
    };

    public setEventOnFirstSlide = (slideIndex: number) => {
        const { currentSlide } = this.state;
        return slideIndex === currentSlide ? this.handleMouseDown : undefined;
    };

    public setCurrentSlideRef = (slideIndex: number) => {
        const { currentSlide } = this.state;
        return slideIndex === currentSlide
            ? (ref: HTMLElement) => {
                  this.refCurrentSlide = ref;
              }
            : null;
    };

    public handleMouseDown = (event: MouseEvent) => {
        this.setState({
            initX: event.pageX,
        });

        document.addEventListener("mousemove", this.handleMouseMove, false);
        document.addEventListener("mouseup", this.handleMouseUp, false);
    };

    public handleMouseMove = (event: MouseEvent) => {
        const mouseX = event.pageX;
        const newTranslateX = this.state.translateX! + mouseX - this.state.initX!;
        const newTranslateY = -Math.abs(newTranslateX / 15);
        const newRotateZ = newTranslateX / 20;

        const { currentSlide } = this.state;
        this.slides[currentSlide!].setTranslateX(newTranslateX);
        this.slides[currentSlide!].setTranslateY(newTranslateY);
        this.slides[currentSlide!].setRotateZ(newRotateZ);

        const { yDistance, zDistance } = this.props;
        let counter = 1;

        for (let i = this.slides.length - 2; i >= 0; i--) {
            this.slides[i].setTranslateX(newTranslateX / (2 * counter));
            this.slides[i].setTranslateY(yDistance * counter);
            this.slides[i].setTranslateZ(-zDistance * counter);
            this.slides[i].setRotateZ(newRotateZ / (2 * counter));
            counter++;
        }

        this.setState({
            translateX: newTranslateX,
            initX: mouseX,
        });

        if (Math.abs(newTranslateX) >= this.refCurrentSlide.offsetWidth - 30) {
            console.log("true");
            document.removeEventListener("mousemove", this.handleMouseMove, false);
            this.handleMouseUp(event);

            this.updateSlidesSettings();

            this.setState({
                currentSlide: currentSlide! - 1,
            });

            this.handleMouseUp(event);
        }
    };

    public updateSlidesSettings = () => {
        const { countSlides }: any = this.state;
        const newSlides = [];
        for (let i = 0; i < countSlides; i++) {
            newSlides.push({ ...this.slides[i].getSliderInfo() });
        }
        console.log("newSlides", newSlides);
        const temp = [];
        const firstSettings = newSlides[0];
        for (let i = 0; i < countSlides; i++) {
            if (i === countSlides - 1) {
                temp.push({ ...firstSettings });
            } else {
                temp.push({ ...newSlides[i + 1] });
            }
        }
        console.log("temp", temp);
        for (let j = 0; j < countSlides; j++) {
            const { translateX, translateY, translateZ, rotateZ, zIndex } = temp[j]!;
            this.slides[j].setTranslateX(translateX);
            this.slides[j].setTranslateY(translateY);
            this.slides[j].setTranslateZ(translateZ);
            this.slides[j].setRotateZ(rotateZ);
            this.slides[j].setZIndex(zIndex);
            console.log("this.slides[j].", temp[j]);
        }
    };

    public handleMouseUp = (event: MouseEvent) => {
        const newTranslateX = 0;
        const newTranslateY = 0;
        const newRotateZ = 0;

        const { currentSlide } = this.state;
        this.slides[currentSlide!].setTranslateX(newTranslateX);
        this.slides[currentSlide!].setTranslateY(newTranslateY);
        this.slides[currentSlide!].setRotateZ(newRotateZ);

        const { yDistance, zDistance } = this.props;
        let counter = 1;

        for (let i = this.slides.length - 2; i >= 0; i--) {
            this.slides[i].setTranslateX(newTranslateX);
            this.slides[i].setTranslateY(yDistance * counter);
            this.slides[i].setTranslateZ(-zDistance * counter);
            this.slides[i].setRotateZ(newRotateZ);
            counter++;
        }

        this.setState({
            translateX: newTranslateX,
            translateY: newTranslateY,
            rotateZ: newRotateZ,
        });

        document.removeEventListener("mousemove", this.handleMouseMove, false);
    };

    public render() {
        return <StackWrapper>{this.getEnhanceChildrens()}</StackWrapper>;
    }
}
