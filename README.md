# react-stacker

Carousel / slider component built with React.js. It’s flexible, fast and touch-friendly.

![Imgur](https://i.imgur.com/4guLYcr.gif)

## Examples

-   To check out live examples visit https://dmitrymorozoff.github.io/react-stacker/

## Getting started

Install `react-stacker` using npm.

### `npm install --save react-stacker`

or if you prefer yarn

### `yarn add react-stacker`

## Usage

```jsx
import React from "react";
import ReactDOM from "react-dom";
import { StackerSlide, StackerSlider } from "react-stacker";

export class App extends React.Component {
    onChangeHandler = value => {
        console.log("On change slide");
    };

    onPrevChangeHandler = event => {
        console.log("On prev change slide");
    };

    onNextChangeHandler = event => {
        console.log("On next change slide");
    };

    render() {
        const { value } = this.state;
        return (
            <StackerSlider
               dots={true}
                infiniteLoop={true}
                onChange={this.onChangeHandler}
                onPrevChange={this.onPrevChangeHandler}
                onNextChange={this.onNextChangeHandler}
            >
                <StackerSlide>
                    Slide 6/6
                </StackerSlide>
                <StackerSlide>
                    Slide 5/6
                </StackerSlide>
                <StackerSlide>
                    Slide 4/6
                </StackerSlide>
                <StackerSlide>
                    Slide 3/6
                </StackerSlide>
                <StackerSlide>
                    Slide 2/6
                </StackerSlide>
                <StackerSlide>
                    Slide 1/6
                </StackerSlide>
            </StackerSlider>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("root"));
```

## Props

| Props              | Type    | Default | Description                                                                   |
| ------------------ | ------- | ------- | ----------------------------------------------------------------------------- |
| className          | string  | -       | -                                                                             |
| zDistance          | number  | -       | Distance between slides by z axis                                             |
| yDistance          | number  | -       | Distance between slides by y axis                                             |
| transitionDuration | number  | -       | Slide transition speed. Number of milliseconds accepted.                      |
| infiniteLoop       | boolean | -       | Flag to make the carousel loop around when it reaches the end.                |
| dots               | boolean | -       | Flag to render pagination component.                                          |
| dotsColor          | string  | -       | The fill color of pagination dots. Any valid CSS color is accepted            |
| dotsActiveColor    | string  | -       | The fill color of the active pagination dot. Any valid CSS color is accepted. |
| dotsSize           | string  | -       | The size of each pagination dot. Pixel values are accepted.                   |
| dotsPadding        | string  | -       | The padding inside each pagination dot. Pixel values are accepted.            |
| slideWidth         | string  | -       | Weight of the slides.                                                         |
| slideHeight        | string  | -       | Height of the slides.                                                         |

## Events

| Event        | Type     | Emitter  |
| ------------ | -------- | -------- |
| onChange     | function | carousel |
| onPrevChange | function | carousel |
| onNextChange | function | carousel |

## Contributing

- For bugs and feature requests, please create an issue
- Lint and test your code
- Pull requests and ⭐ stars are always welcome

## Raising issues

When raising an issue, please add as much details as possible. Screenshots, video recordings, or anything else that can make it easier to reproduce the bug you are reporting.

## License

This project is licensed under the MIT License