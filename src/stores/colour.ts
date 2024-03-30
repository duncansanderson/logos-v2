import { defineStore } from 'pinia';
import { ref } from 'vue';
import { COLOURS } from '@/constants';

export const useColourStore = defineStore('colourStore', () => {
    const backgroundColour = ref('blue-sky');
    const foregroundColour = ref('strato-blue');

    // Filter foreground colours based on the selected background colour.
    function colourFilter() {
        return COLOURS.filter((colour) =>
            colour.matchingForeground.includes(backgroundColour.value)
        );
    }

    // Update the colours when a background colour is selected.
    function updateColours(colour: string) {
        backgroundColour.value = colour;
        foregroundColour.value = colourFilter()[0].name;
    }

    // Update the foreground colour.
    function updateForegroundColour(colour: string) {
        foregroundColour.value = colour;
    }

    return {
        backgroundColour,
        foregroundColour,
        colourFilter,
        updateColours,
        updateForegroundColour,
    };
});
