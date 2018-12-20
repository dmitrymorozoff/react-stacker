import * as React from "react";
import { StackerPagination } from "./components/stacker-pagination/index";
import { ISlideProps } from "./components/stacker-slide/index";
import { StackerWrapper } from "./components/stacker-wrapper";
import { IStackerSliderProps, IStackerSliderSlide, IStackerSliderState } from "./interfaces";
import { deepClone } from "./utils/deep-clone";
import { shiftArray } from "./utils/shift-array";

export class StackerSlider extends React.PureComponent<IStackerSliderProps, IStackerSliderState> {
    public static defaultProps: Partial<IStackerSliderProps> = {
        zDistance: 50,
        yDistance: 30,
        slideWidth: "350px",
        slideHeight: "350px",
        transitionDuration: 0.8,
        infiniteLoop: true,
        dots: false,
        dotsColor: "#fff",
        dotsActiveColor: "#ff0000",
    };
    private refCurrentSlide: any;
    private timeout: NodeJS.Timer | null | undefined;

    constructor(props: IStackerSliderProps) {
        super(props);
        this.state = {
            countSlides: 0,
            currentActiveSlide: 0,
            slides: [],
            initX: 0,
            currentTranslateX: 0,
            currentTranslateY: 0,
            currentRotateZ: 0,
            startMovingPosition: 0,
            direction: 0,
        };

        this.refCurrentSlide = React.createRef();
    }

    public componentDidMount() {
        const countSlides = this.getCountSlides();
        const { zDistance, yDistance } = this.props;

        let currentYDistance = 0;
        let currentZDistance = 0;
        let opacity = 1;
        const stepOpacity = 0.5 / (countSlides - 1);
        const slides = [];

        for (let i = countSlides - 1; i >= 0; i--) {
            const slideSetting: IStackerSliderSlide = {
                transition: "none",
                translateX: 0,
                translateY: currentYDistance,
                translateZ: currentZDistance,
                rotateZ: 0,
                zIndex: i,
                id: i,
                opacity,
            };

            slides[i] = slideSetting;
            currentYDistance += yDistance || 0;
            currentZDistance -= zDistance || 0;
            opacity -= stepOpacity;
        }

        this.setState({
            slides: [...slides],
            countSlides,
            currentActiveSlide: countSlides - 1,
        });
    }

    public componentWillUnmount() {
        if (this.timeout) {
            clearTimeout(this.timeout);
            this.timeout = null;
        }
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
            startMovingPosition: event.pageX,
        });

        document.addEventListener("mousemove", this.handleMouseMove, false);
        document.addEventListener("mouseup", this.handleMouseUp, false);
    };

    public handleMouseMove = (event: MouseEvent) => {
        const { slides, direction, startMovingPosition, countSlides } = this.state;
        const mouseX = event.pageX;
        const newTransX = this.state.currentTranslateX + (mouseX - this.state.initX);

        if (!this.isCorrectMovingDelta(startMovingPosition, mouseX)) {
            return;
        }
        this.checkDirection(newTransX, direction);

        const newTransY = -Math.abs(newTransX / 15);
        const newRotZ = this.getRotateZCard(newTransX);
        const newSlides: IStackerSliderSlide[] = deepClone(slides);

        const nextCurrentActiveSlide = this.getNextCurrentSlide(direction);
        const { infiniteLoop: loop } = this.props;

        if (!loop && direction < 0 && nextCurrentActiveSlide === countSlides - 1) {
            return;
        }

        if (!loop && direction > 0 && nextCurrentActiveSlide === 0) {
            return;
        }

        if (direction < 0) {
            this.moveToLeftHandler(newSlides, newTransX, newTransY, newRotZ);
        } else if (direction > 0) {
            this.moveToRightHandler(newSlides, newTransX, newTransY, mouseX);
        }

        this.setState({
            slides: [...newSlides],
            currentTranslateX: newTransX,
            currentTranslateY: newTransY,
            currentRotateZ: newRotZ,
            initX: mouseX,
        });
        event.preventDefault();

        if (Math.abs(newTransX) >= this.refCurrentSlide.offsetWidth) {
            this.refCurrentSlide.style.transition = "ease .2s";
            this.refCurrentSlide.style.opacity = 0;
            this.handleMouseUp(event);
            if (direction > 0) {
                this.updateSlidesPosition(direction);
            } else {
                this.timeout = setTimeout(() => {
                    this.refCurrentSlide.style.transition = "none";
                    this.refCurrentSlide.style.opacity = "1";
                    this.updateSlidesPosition(direction);
                }, 200);
            }
            this.onChangeHandler(direction);
            return;
        }
    };

    public onChangeHandler = (direction: number) => {
        const { onChange, onNextChange, onPrevChange } = this.props;
        if (onChange) {
            onChange();
        }
        if (onNextChange) {
            if (direction < 0) {
                onNextChange();
            }
        }
        if (onPrevChange) {
            if (direction > 0) {
                onPrevChange();
            }
        }
    };

    public moveToLeftHandler = (
        newSlides: IStackerSliderSlide[],
        newTransX: number,
        newTransY: number,
        newRotZ: number,
    ) => {
        const { currentActiveSlide, countSlides } = this.state;
        const { yDistance, zDistance } = this.props;

        Object.assign(newSlides[currentActiveSlide], {
            translateX: newTransX,
            translateY: newTransY,
            rotateZ: newRotZ,
            transition: "none",
        });

        let count = 1;
        for (let j = countSlides - 2; j >= 0; j--) {
            const indexElement = this.getPrevIndexElement(j, countSlides, currentActiveSlide);

            Object.assign(newSlides[indexElement], {
                translateX: newTransX / (2 * count),
                translateY: (yDistance || 0) * count,
                translateZ: -(zDistance || 0) * count,
                rotateZ: newRotZ / (2 * count),
                transition: "none",
            });
            count++;
        }
    };

    public moveToRightHandler = (
        newSlides: IStackerSliderSlide[],
        newTransX: number,
        newTransY: number,
        mouseX: number,
    ) => {
        const { currentActiveSlide, countSlides } = this.state;
        const { yDistance, zDistance } = this.props;
        const firstSlide = newSlides.findIndex((slide: IStackerSliderSlide) => {
            return slide.id === 0;
        });
        const prevSlideTransX =
            this.state.currentTranslateX +
            (mouseX - this.state.initX - this.refCurrentSlide.offsetWidth);
        const prewSlideRotZ = this.getRotateZCard(prevSlideTransX);

        Object.assign(newSlides[firstSlide], {
            translateX: newTransX - this.refCurrentSlide.offsetWidth,
            translateY: newTransY,
            translateZ: 0,
            rotateZ: prewSlideRotZ,
            opacity: 1,
            zIndex: countSlides + 1,
        });

        const stepOpacity = 0.5 / (countSlides - 1);
        let opacity = 1 - stepOpacity;
        let count = 1;

        for (let j = countSlides - 1; j >= 0; j--) {
            const indexElement = this.getPrevIndexElement(j, countSlides, currentActiveSlide);
            if (newSlides[indexElement].id === 0) {
                continue;
            }

            Object.assign(newSlides[indexElement], {
                translateY: (yDistance || 0) * count,
                translateZ: -(zDistance || 0) * count,
                opacity,
            });

            opacity -= stepOpacity;
            count++;
        }
    };

    public isCorrectMovingDelta = (startMovingPosition: number, mouseX: number): boolean => {
        let movingDelta = 0;
        if (startMovingPosition) {
            movingDelta = Math.abs(startMovingPosition - mouseX);
        }
        if (movingDelta < 10) {
            return false;
        }
        return true;
    };

    public checkDirection = (newTransX: number, direction: 0 | 1 | -1) => {
        if (newTransX < 0 && direction === 0) {
            this.setState({
                direction: -1,
            });
        } else if (direction === 0) {
            this.setState({
                direction: 1,
            });
        }
    };

    public updateSlidesPosition = (direction: number) => {
        const nextCurrentActiveSlide = this.getNextCurrentSlide(direction);
        const { slides }: IStackerSliderState = this.state;
        const newSlides: IStackerSliderSlide[] = deepClone(slides);
        shiftArray(newSlides, 1, direction);

        this.setState({
            slides: [...newSlides],
            currentActiveSlide: nextCurrentActiveSlide,
        });

        document.removeEventListener("mouseup", this.handleMouseUp, false);
    };

    public getNextCurrentSlide = (direction: number) => {
        const { countSlides, currentActiveSlide }: IStackerSliderState = this.state;

        let nextCurrentActiveSlide = null;
        if (direction < 0) {
            nextCurrentActiveSlide = currentActiveSlide - 1;
            if (nextCurrentActiveSlide < 0) {
                nextCurrentActiveSlide = countSlides - 1;
            }
        } else {
            nextCurrentActiveSlide = currentActiveSlide + 1;
            if (nextCurrentActiveSlide > countSlides - 1) {
                nextCurrentActiveSlide = 0;
            }
        }

        return nextCurrentActiveSlide;
    };

    public handleMouseUp = (event: MouseEvent) => {
        event.preventDefault();
        const newTranslateX = 0;
        const newTranslateY = 0;
        const newRotateZ = 0;
        const { currentActiveSlide, countSlides, slides } = this.state;

        const newSlides: IStackerSliderSlide[] = [];
        for (let i = 0; i < countSlides; i++) {
            const newObject = JSON.parse(JSON.stringify(slides[i]));
            newSlides.push(newObject);
        }

        const { yDistance, zDistance, transitionDuration } = this.props;
        const timing = "0, 1.95, .49, .73";

        Object.assign(newSlides[currentActiveSlide], {
            translateX: newTranslateX,
            translateY: newTranslateY,
            translateZ: 0,
            transition: `cubic-bezier(${timing}) ${transitionDuration}s`,
            rotateZ: newRotateZ,
            zIndex: newSlides[currentActiveSlide].id,
            opacity: 1,
        });

        const stepOpacity = 0.5 / (countSlides - 1);
        let opacity = 1 - stepOpacity;
        let count = 1;

        for (let j = countSlides - 2; j >= 0; j--) {
            const indexElement = this.getPrevIndexElement(j, countSlides, currentActiveSlide);

            Object.assign(newSlides[indexElement], {
                translateX: newTranslateX,
                translateY: (yDistance || 0) * count,
                translateZ: -(zDistance || 0) * count,
                transition: `cubic-bezier(${timing}) 0.4s`,
                rotateZ: newRotateZ,
                zIndex: newSlides[indexElement].id,
                opacity,
            });
            opacity -= stepOpacity;
            count++;
        }

        this.setState({
            currentTranslateX: newTranslateX,
            currentTranslateY: newTranslateY,
            currentRotateZ: newRotateZ,
            slides: [...newSlides],
            startMovingPosition: 0,
            direction: 0,
        });

        document.removeEventListener("mousemove", this.handleMouseMove, false);
    };

    public getPrevIndexElement = (
        currentIndex: number,
        countSlides: number,
        currentActiveSlide: number,
    ) => {
        let indexElement = currentIndex - (countSlides - 1 - currentActiveSlide);
        if (indexElement < 0) {
            indexElement = countSlides - Math.abs(indexElement);
        }
        return indexElement;
    };

    public getRotateZCard = (translateX: number) => {
        return translateX / Math.sqrt(this.refCurrentSlide.offsetWidth);
    };

    public render() {
        const { countSlides, currentActiveSlide } = this.state;
        const { dots, className, slideWidth, slideHeight, dotsColor, dotsActiveColor } = this.props;
        return (
            <StackerWrapper className={className} slideWidth={slideWidth} slideHeight={slideHeight}>
                {this.getEnhanceChildrens()}
                {dots && (
                    <StackerPagination
                        countSlides={countSlides}
                        activeSlide={currentActiveSlide}
                        dotsColor={dotsColor}
                        dotsActiveColor={dotsActiveColor}
                    />
                )}
            </StackerWrapper>
        );
    }
}
