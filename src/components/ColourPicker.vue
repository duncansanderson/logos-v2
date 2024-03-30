<script setup lang="ts">
import { computed } from 'vue';
import { COLOURS } from '../constants';
import { useColourStore } from '@/stores/colour';
import ColourButton from './ColourButton.vue';

const store = useColourStore();

const backgroundColour = computed(() => store.backgroundColour);
const foregroundColour = computed(() => store.foregroundColour);
const colourFilter = computed(() => store.colourFilter());

function updateColours(colour: string) {
    store.updateColours(colour);
}

function updateForegroundColour(colour: string) {
    store.updateForegroundColour(colour);
}
</script>

<template>
    <div class="colour-controls">
        <div class="colour-picker">
            <div class="colour-picker__label">Background</div>
            <div class="colour-picker__colours">
                <template
                    v-for="colour in COLOURS"
                    :key="colour.name"
                >
                    <ColourButton
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
                    v-for="colour in colourFilter"
                    :key="`${colour.name}fg`"
                >
                    <ColourButton
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
        <!-- <div class="colour-contrast" v-if="sharedState.backgroundColourHex != 'transparent'">
            <div class="colour-contrast__label">Colour contrast</div>
            <div class="colour-contrast__ratio">
                <div class="ratio__value">{{ sharedState.contrastRatio }}</div>
                <div class="ratio__small">
                    <svg v-if="sharedState.readabilityTests[1].result" width="17px" height="18px" viewBox="0 0 17 18" stroke="green">
                        <polyline points="2.8,9.4 6.5,14.1 14.2,3.3 " fill="none"></polyline>
                    </svg>
                    <svg v-else width="17" height="18" viewBox="0 0 17 18" stroke="red">
                        <line x1="2.6" y1="14.9" x2="14.4" y2="3.1"></line>
                        <line x1="14.4" y1="14.9" x2="2.6" y2="3.1"></line>
                    </svg>
                    Small text
                </div>
                <div class="ratio__large">
                    <svg v-if="sharedState.readabilityTests[0].result" width="17px" height="18px" viewBox="0 0 17 18" stroke="green">
                        <polyline points="2.8,9.4 6.5,14.1 14.2,3.3 " fill="none"></polyline>
                    </svg>
                    <svg v-else width="17" height="18" viewBox="0 0 17 18" stroke="red">
                        <line x1="2.6" y1="14.9" x2="14.4" y2="3.1"></line>
                        <line x1="14.4" y1="14.9" x2="2.6" y2="3.1"></line>
                    </svg>
                    Large text
                </div>
            </div>
        </div> -->
    </div>
</template>

<style lang="scss" scoped>
// @import '../variables.scss';

// .colour-controls {
//     display: grid;
//     grid-gap: 10px;
//     grid-template-columns: 1fr 1fr;
// }

// @media (min-width: 700px) {
//     .colour-controls {
//         grid-template-columns: 1fr;
//         grid-template-rows: auto auto;
//     }
// }

// .colour-picker {
//     &__label {
//         margin-bottom: 16px;
//     }

//     &__colours {
//         display: flex;
//         flex-wrap: wrap;
//     }

//     &__colour {
//         align-items: center;
//         border: 2px solid transparent;
//         border-radius: 50%;
//         display: flex;
//         height: 70px;
//         justify-content: center;
//         width: 70px;

//         &.active {
//             border: 2px solid black;
//         }

//         button {
//             border: none;
//             border-radius: 50%;
//             cursor: pointer;
//             height: 60px;
//             width: 60px;

//             &:focus {
//                 outline: 0;
//                 border: 2px solid blue;
//             }

//             &.transparent {
//                 background-image: url(../assets/transparent.png)
//             }
//         }
//     }
// }

// .colour-contrast {
//     grid-column: span 2;

//     @media (min-width: 700px) {
//         grid-column: span 1;
//     }

//     &__label {
//         margin-bottom: 16px;
//     }

//     &__ratio {
//         display: grid;
//         grid-gap: 30px;
//         grid-template-columns: auto auto auto;
//         justify-content: space-between;

//         @media (min-width: 700px) {
//             grid-template-columns: auto auto 1fr;
//         }

//         .ratio__small, .ratio__large {
//             svg {
//                 margin-top: -4px;
//                 position: relative;
//                 top: 3px;
//             }
//         }
//     }
// }
</style>
