import { defineStore } from 'pinia';
import { ref } from 'vue';
import { COLOURS } from '@/constants';

export const useColourStore = defineStore('colourStore', () => {
    const backgroundColour = ref('#85b6c5');
    const foregroundColour = ref('#1d253c');

    // Filter foreground colours based on the selected background colour.
    function colourFilter() {
        return COLOURS.filter((colour) => colour.matches.includes(backgroundColour.value));
    }

    // Update the colours when a background colour is selected.
    function updateColours(colour: string) {
        backgroundColour.value = colour;
        foregroundColour.value = colourFilter()[0].hex;
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
