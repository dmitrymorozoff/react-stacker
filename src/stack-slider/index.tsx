import * as React from "react";
import { ISlideProps } from "./components/stack-slide/index";
import { StackWrapper } from "./components/stack-wrapper";
import { SlideHelper } from "./utils/slide-helper";

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
}

export class StackSlider extends React.PureComponent<IProps, IState> {
    public static defaultProps: Partial<IProps> = {
        zDistance: 50,
        yDistance: 20,
    };
    private slides: SlideHelper[] = [];

    constructor(props: IProps) {
        super(props);
        this.state = {
            initX: null,
            mouseX: null,
            translateX: 0,
            translateY: 0,
            rotateZ: 0,
            currentSlide: 0,
        };
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
            this.slides[i] = new SlideHelper(currentYDistance, currentZDistance);

            currentYDistance += yDistance;
            currentZDistance -= zDistance;
        }
        this.setState({
            currentSlide: countSlides - 1,
        });
    }

    public getEnhanceChildrens = () => {
        const { children } = this.props;

        const childrenArray: any = React.Children.toArray(children);
        const childrenWithProps: any = [];
        for (let i = this.slides.length - 1; i >= 0; i--) {
            const { translateX, translateY, translateZ } = this.slides[i].getSliderInfo();
            const slide = React.cloneElement(childrenArray[i], {
                translateX,
                translateY,
                translateZ,
                onMouseDown: this.getEventOnFirstSlide(i),
            });
            childrenWithProps[i] = slide;
        }

        return childrenWithProps;
    };

    public getEventOnFirstSlide = (slideIndex: number) => {
        const { currentSlide } = this.state;
        return slideIndex === currentSlide ? this.handleMouseDown : undefined;
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

        console.log("slide", this.slides[currentSlide!]);

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
