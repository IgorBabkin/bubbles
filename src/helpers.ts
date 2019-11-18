import { arrayFromNumber } from 'utils';
import { TKeyFrame, IStyle } from 'fela';

interface IGenerateMSProps {
    rollingDuration: number;
    blinkingDuration: number;
    speed: number;
}

export const generateRollingMilestones = ({ rollingDuration, blinkingDuration, speed }: IGenerateMSProps) => {
    const bubbleAmount = Math.ceil(speed * rollingDuration);
    const totalDuration = rollingDuration + blinkingDuration;
    const timePerBubbleMS = rollingDuration / bubbleAmount;
    const timePerBubblePS = timePerBubbleMS / totalDuration;
    const output = arrayFromNumber(bubbleAmount + 1).map((i) => i * timePerBubblePS);
    return output;
};

interface IGenerateBlinkingMSProps {
    rollingDuration: number;
    blinkingDuration: number;
}

export const generateBlinkingMilestones = ({ rollingDuration, blinkingDuration }: IGenerateBlinkingMSProps) => {
    const totalDuration = rollingDuration + blinkingDuration;
    const rollingAnimationPS = rollingDuration / totalDuration;
    const blinkingAnimationPS = blinkingDuration / totalDuration;
    const blinkingActionDurationPS = Math.floor(blinkingAnimationPS / 3 * 100) / 100;
    return [
        rollingAnimationPS + 0.01,
        rollingAnimationPS + blinkingActionDurationPS,
        rollingAnimationPS + 2 * blinkingActionDurationPS,
        1,
    ];
};

export type Frame = number[][];
export type BlinkFrames = [number[], number[], number[]];

export function generateSteps(input: number[]): Frame {
    const output = [
        [input[0] * 100, input[1] * 100],
    ];
    for (let i = 1; i < input.length - 1; i++) {
        output.push([input[i] * 100 + 1, (input[i + 1]) * 100]);
    }

    return output;
}

type Style = {
    [persent: string]: IStyle;
}

interface IRollingKeyframes {
    data: Frame;
    current: number;
    bubbleAmount: number;
    activeBubbleAmount: number;
    activeStyle: IStyle;
    passiveStyle: IStyle;
}

export function generateRollingKeyframes(props: IRollingKeyframes): Style {
    const { activeStyle, passiveStyle, data } = props;
    const length = Math.ceil(props.bubbleAmount / props.activeBubbleAmount);
    const isActive = (i: number) => i % length === props.current;
    return data.reduce((acc, [from, to], i) => {
        const isFirst = i === 0;
        const isLast = i === data.length - 1;
        const isOpened = isFirst || isActive(i - 1) !== isActive(i);
        const isClosed = isLast || isActive(i) !== isActive(i + 1);

        if (isOpened) {
            acc[`${from}%`] = isActive(i) ? activeStyle : passiveStyle;
        }

        if (isClosed) {
            acc[`${to}%`] = isActive(i) ? activeStyle : passiveStyle;
        }
        return acc;
    }, {});
}

interface IBlinkingKeyframesProps {
    data: BlinkFrames;
    activeStyle: IStyle;
    passiveStyle: IStyle;
}
export function generateBlinkingKeyframes(props: IBlinkingKeyframesProps): Style {
    const { activeStyle, passiveStyle } = props;
    const [fst, snd, thd] = props.data;
    return {
        [`${fst[0]}%`]: activeStyle,
        [`${fst[1]}%`]: activeStyle,
        [`${snd[0]}%`]: passiveStyle,
        [`${snd[1]}%`]: passiveStyle,
        [`${thd[0]}%`]: activeStyle,
        [`${thd[1]}%`]: activeStyle,
    };
}
