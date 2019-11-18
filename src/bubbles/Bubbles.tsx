import { activeBubbleAmount, widthInBls, heightInBls } from 'config';
import React, { FunctionComponent } from 'react';
import { useFela } from 'react-fela';
import { arrayFromNumber } from 'utils';
import { bubbleStyle, containerStyle, topBubblesStyle, bottomBubblesStyle, middleStyle, leftStyle, contentStyle, rightStyle } from './bubbles.styles';

function currentKeyFrame(s: number, i: number) {
    return (i + s) % Math.ceil(widthInBls / activeBubbleAmount) + 1;
}
export const Bubbles: FunctionComponent = (props) => {
    const { css } = useFela(props);
    return (
        <div className={css(containerStyle)} data-name='bubbles'>
            <div className={css(topBubblesStyle)}>
                {arrayFromNumber(widthInBls).map((i) => (
                    <div key={i} className={css(bubbleStyle(`k${currentKeyFrame(0, i)}`))} />
                ))}
            </div>
            <div className={css(middleStyle)}>
                <div className={css(leftStyle)}>
                    {arrayFromNumber(heightInBls).map((i) => (
                        <div key={i} className={css(bubbleStyle(`k${currentKeyFrame(2 * widthInBls + heightInBls, i)}`))} />
                    ))}
                </div>
                <div className={css(contentStyle)}>
                        asdasd
                </div>
                <div className={css(rightStyle)}>
                    {arrayFromNumber(heightInBls).map((i) => (
                        <div key={i} className={css(bubbleStyle(`k${currentKeyFrame(widthInBls, i)}`))} />
                    ))}
                </div>
            </div>
            <div className={css(bottomBubblesStyle)}>
                {arrayFromNumber(widthInBls).map((i) => (
                    <div key={i} className={css(bubbleStyle(`k${currentKeyFrame(heightInBls + widthInBls, i)}`))} />
                ))}
            </div>
        </div>
    );
};
