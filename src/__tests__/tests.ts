import { generateRollingMilestones, generateBlinkingMilestones, generateSteps, generateRollingKeyframes, generateBlinkingKeyframes } from 'helpers';

describe('test generator', () => {

    test('generateMilestones', () => {
        expect(generateRollingMilestones({ rollingDuration: 2, blinkingDuration: 2, speed: 2 })).toStrictEqual([
            0, 0.125, 0.25, 0.375, 0.5,
        ]);
    });

    test('generateMilestones2', () => {
        expect(generateRollingMilestones({ rollingDuration: 3, blinkingDuration: 1, speed: 3 })).toStrictEqual([
            0,
            0.25,
            0.5,
            0.75,
        ]);
    });

    test('generateSteps', () => {
        expect(generateSteps([
            0,
            0.25,
            0.5,
            0.75,
        ])).toStrictEqual([
            [0, 25],
            [26, 50],
            [51, 75],
        ]);
    });

    test('generateBlinkingMilestones', () => {
        expect(generateBlinkingMilestones({ rollingDuration: 3, blinkingDuration: 1 })).toStrictEqual([
            0.76,
            0.83,
            0.91,
            1,
        ]);
    });

    test.only('generateRollingKeyframes', () => {
        const newLocal = generateRollingKeyframes({
            data: [
                [0, 10],
                [11, 20],
                [21, 30],
                [31, 40],
                [41, 50],
                [51, 60],
            ],
            current: 1,
            activeBubbleAmount: 2,
            bubbleAmount: 3,
            activeStyle: {
                backgroundColor: 'orange',
            },
            passiveStyle: {
                backgroundColor: 'grey',
            },
        });
        expect(newLocal).toStrictEqual({
            '0%': {
                backgroundColor: 'grey',
            },
            '10%': {
                backgroundColor: 'grey',
            },
            '11%': {
                backgroundColor: 'orange',
            },
            '20%': {
                backgroundColor: 'orange',
            },
            '21%': {
                backgroundColor: 'grey',
            },
            '30%': {
                backgroundColor: 'grey',
            },
            '31%': {
                backgroundColor: 'grey',
            },
            '40%': {
                backgroundColor: 'grey',
            },
            '41%': {
                backgroundColor: 'orange',
            },
            '50%': {
                backgroundColor: 'orange',
            },
            '51%': {
                backgroundColor: 'grey',
            },
            '60%': {
                backgroundColor: 'grey',
            },
        });
    });

    test('generateBlinkingKeyframes', () => {
        expect(generateBlinkingKeyframes({
            data: [
                [0, 25],
                [26, 50],
                [51, 75],
            ],
            activeStyle: {
                backgroundColor: 'orange',
            },
            passiveStyle: {
                backgroundColor: 'grey',
            },
        })).toStrictEqual({
            '0%': {
                backgroundColor: 'orange',
            },
            '25%': {
                backgroundColor: 'orange',
            },
            '26%': {
                backgroundColor: 'grey',
            },
            '50%': {
                backgroundColor: 'grey',
            },
            '51%': {
                backgroundColor: 'orange',
            },
            '75%': {
                backgroundColor: 'orange',
            },
        });
    });
});
