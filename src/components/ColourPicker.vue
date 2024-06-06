<script setup lang="ts">
import { computed } from 'vue';
import { COLOURS } from '../constants';
import { useColourStore } from '@/stores/colour';
import ColourButton from './ColourButton.vue';
import ColourContrast from './ColourContrast.vue';

const colourStore = useColourStore();

const backgroundColour = computed(() => colourStore.backgroundColour);
const foregroundColour = computed(() => colourStore.foregroundColour);
const colourFilter = computed(() => colourStore.colourFilter());

function updateColours(colour: string) {
    colourStore.updateColours(colour);
}

function updateForegroundColour(colour: string) {
    colourStore.updateForegroundColour(colour);
}
</script>

<template>
    <div
        class="colour-controls"
        data-test="colour-picker"
    >
        <div class="colour-picker">
            <div class="colour-picker__label">Background</div>
            <div class="colour-picker__colours">
                <template
                    v-for="(colour, index) in COLOURS"
                    :key="colour.name"
                >
                    <ColourButton
                        :id="`colour-picker__backgroundColour-${index}`"
                        :class="[
                            { active: backgroundColour == colour.name },
                            'colour-picker__colour',
                        ]"
                        v-if="colour.background"
                        :colour-name="colour.name"
                        @click="updateColours"
                    />
                </template>
            </div>
        </div>
        <div class="colour-picker">
            <div class="colour-picker__label">Foreground</div>
            <div class="colour-picker__colours">
                <template
                    v-for="(colour, index) in colourFilter"
                    :key="`${colour.name}fg`"
                >
                    <ColourButton
                        :id="`colour-picker__forgroundColour-${index}`"
                        :class="[
                            { active: foregroundColour == colour.name },
                            'colour-picker__colour',
                        ]"
                        :colour-name="colour.name"
                        @click="updateForegroundColour"
                    />
                </template>
            </div>
        </div>
        <ColourContrast />
    </div>
</template>

<style lang="scss" scoped>
.colour-controls {
    display: grid;
    grid-gap: 10px;
    grid-template-columns: 1fr 1fr;
}

@media (min-width: 700px) {
    .colour-controls {
        grid-template-columns: 1fr;
        grid-template-rows: auto auto;
    }
}

.colour-picker {
    &__label {
        margin-bottom: 16px;
    }

    &__colours {
        display: flex;
        flex-wrap: wrap;
    }
}
</style>
