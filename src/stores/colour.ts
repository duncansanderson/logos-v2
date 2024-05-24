import { defineStore } from 'pinia';
import { ref } from 'vue';
import tinycolor from 'tinycolor2';
import { COLOURS } from '@/constants';

export const useColourStore = defineStore('colourStore', () => {
    const backgroundColour = ref('blue-sky');
    const foregroundColour = ref('strato-blue');
    const contrastRatio = ref(0);
    const readabilityTests = ref([
        {
            name: 'AA large',
            level: 'AA',
            size: 'large',
            result: false,
        },
        {
            name: 'AA small',
            level: 'AA',
            size: 'small',
            result: false,
        },
        {
            name: 'AAA large',
            level: 'AAA',
            size: 'large',
            result: false,
        },
        {
            name: 'AAA small',
            level: 'AAA',
            size: 'small',
            result: false,
        },
    ]);

    // Filter foreground colours based on the selected background colour.
    function colourFilter() {
        return COLOURS.filter((colour) =>
            colour.matchingForeground.includes(backgroundColour.value)
        );
    }

    // Get the hex value of a colour.
    function getColourHex(colourName: string) {
        const colour = COLOURS.find((colour) => colour.name === colourName);
        return colour?.hex;
    }

    // Update the colours when a background colour is selected.
    function updateColours(colour: string) {
        backgroundColour.value = colour;
        foregroundColour.value = colourFilter()[0].name;

        calcColourRatio();
    }

    // Update the foreground colour.
    function updateForegroundColour(colour: string) {
        foregroundColour.value = colour;

        calcColourRatio();
    }

    // Calculate the contrast ration between the background and foreground colours and test if they meet the WCAG 2.0 standards.
    function calcColourRatio() {
        const backgroundHex = getColourHex(backgroundColour.value);
        const foregroundHex = getColourHex(foregroundColour.value);

        contrastRatio.value = tinycolor.readability(foregroundHex, backgroundHex).toFixed(1);

        readabilityTests.value.forEach((test) => {
            test.result = tinycolor.isReadable(foregroundHex, backgroundHex, {
                level: test.level,
                size: test.size,
            });
        });
    }

    return {
        backgroundColour,
        contrastRatio,
        foregroundColour,
        readabilityTests,
        calcColourRatio,
        colourFilter,
        getColourHex,
        updateColours,
        updateForegroundColour,
    };
});
