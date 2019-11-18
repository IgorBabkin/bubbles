import { activeBubbleAmount, blinkingDuration, rollingDuration, rollingSpeed, widthInBls } from 'config';
import { createRenderer } from 'fela';
import embedded from 'fela-plugin-embedded';
import extend from 'fela-plugin-extend';
import fallbackValue from 'fela-plugin-fallback-value';
import prefixer from 'fela-plugin-prefixer';
import unit from 'fela-plugin-unit';
import { generateBlinkingKeyframes as genBlinkKeyFms, generateBlinkingMilestones as genBlinkMilestones, generateRollingKeyframes as genRollKeyFms, generateRollingMilestones as genRollMilestones, generateSteps as genSteps, BlinkFrames } from 'helpers';
import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-fela';
import { Stage } from 'stage/Stage';

const renderer = createRenderer({
    plugins: [
        prefixer(),
        fallbackValue(),
        embedded(),
        extend(),
        unit('rem'),
    ],
});

const data = genBlinkMilestones({ rollingDuration, blinkingDuration });
const blinkingKeyframes = genBlinkKeyFms({
    data: genSteps(data) as BlinkFrames,
    activeStyle: {
        backgroundColor: 'orange',
    },
    passiveStyle: {
        backgroundColor: 'grey',
    },
});
console.log(blinkingKeyframes);

const bubbleAmount = widthInBls;
for (let i = 0; i < Math.ceil(bubbleAmount / activeBubbleAmount); i++) {
    renderer.renderKeyframe(() => {
        const frames = genRollMilestones({ rollingDuration, blinkingDuration, speed: rollingSpeed });
        const rollingKeyframes = genRollKeyFms({
            data: genSteps(frames),
            current: i,
            bubbleAmount,
            activeBubbleAmount,
            activeStyle: {
                backgroundColor: 'orange',
            },
            passiveStyle: {
                backgroundColor: 'grey',
            },
        });
        const output = {
            ...rollingKeyframes,
            ...blinkingKeyframes,
        };
        console.log(output);
        return output;
    }, {});
}

render(
    <Provider renderer={renderer}>
        <Stage />
    </Provider>,
    document.getElementById('root'),
)

if (module.hot) {
    module.hot.accept();
}
