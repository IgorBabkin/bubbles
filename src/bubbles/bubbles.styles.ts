import { IStyle } from 'fela';
import { rollingDuration, blinkingDuration, bubbleSize, width, height, margin } from 'config';

export const containerStyle = (): IStyle => ({
    width: `${width}px`,
    height: `${height}px`,
    display: 'flex',
    flexDirection: 'column',
});

export const topBubblesStyle = (): IStyle => ({
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    flexShrink: 0,
    flexDirection: 'row',
});

export const bottomBubblesStyle = (): IStyle => ({
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    flexShrink: 0,
    flexDirection: 'row-reverse',
});

export const middleStyle = (): IStyle => ({
    display: 'flex',
    width: '100%',
    flexGrow: 1,
});

export const rightStyle = (): IStyle => ({
    display: 'flex',
    flexShrink: 0,
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingTop: `${margin}px`,
    paddingBottom: `${margin}px`,
});

export const leftStyle = (): IStyle => ({
    display: 'flex',
    flexShrink: 0,
    flexDirection: 'column-reverse',
    justifyContent: 'space-between',
    paddingTop: `${margin}px`,
    paddingBottom: `${margin}px`,
});

export const contentStyle = (): IStyle => ({
    width: '100%',
    height: '100%',
    flexGrow: 1,
    display: 'flex',
});

export const bubbleStyle = (animationName: string, i: number) => (): IStyle => ({
    'height': `${bubbleSize}px`,
    'width': `${bubbleSize}px`,

    animationName,
    'animationDuration': `${rollingDuration + blinkingDuration}s`,
    'animationDirection': 'normal',
    'animationIterationCount': 'infinite',
    'animationPlayState': 'running',
    'animationFillMode': 'initial',
    'animationTimingFunction': 'ease',

    'position': 'relative',
    'display': 'block',
    'backgroundColor': 'rgba(255, 93, 64, 0.2)',
    'backgroundImage': 'linear-gradient(to top, rgba(255, 93, 64, 1), rgba(255, 93, 64, 0.1))',
    'borderRadius': '50%',
    'pointerEvents': 'all',

    ':before': {
        content: "' '",
        visibility: 'visible',
        position: 'absolute',
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        backgroundImage: 'linear-gradient(to top, rgba(255, 255, 255, 0.3), rgba(0, 0, 0, 0.3))',
        borderRadius: '50%',
        width: '100%',
        height: '100%',
        boxShadow: 'rgba(0, 0, 0, 0.1) 0 -1px 7px 1px, inset rgba(255, 255, 255, 0.2) 0 -1px 9px, rgba(0, 0, 0, 0.1) 0 2px 12px',
    }
});
