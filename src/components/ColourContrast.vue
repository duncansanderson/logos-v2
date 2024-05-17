<script setup lang="ts">
import { computed } from 'vue';
import IconTick from './icons/IconTick.vue';
import IconCross from './icons/IconCross.vue';
import { useColourStore } from '../stores/colour';
const colourStore = useColourStore();

const backgroundColour = computed(() => colourStore.backgroundColour);
const contrastRatio = computed(() => colourStore.contrastRatio);
const smallReadability = computed(() => colourStore.readabilityTests[1].result);
const largeReadability = computed(() => colourStore.readabilityTests[0].result);
</script>

<template>
    <div
        class="colour-contrast"
        v-if="backgroundColour !== 'transparent'"
        data-test="colour-contrast"
    >
        <div class="colour-contrast__label">Colour contrast</div>
        <div class="colour-contrast__ratio">
            <div class="ratio__value">{{ contrastRatio }}</div>
            <div class="ratio__small">
                <IconTick v-if="smallReadability" />
                <IconCross v-else />
                Small text
            </div>
            <div class="ratio__large">
                <IconTick v-if="largeReadability" />
                <IconCross v-else />
                Large text
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.colour-contrast {
    grid-column: span 2;

    @media (min-width: 700px) {
        grid-column: span 1;
    }

    &__label {
        margin-bottom: 16px;
    }

    &__ratio {
        display: grid;
        grid-gap: 30px;
        grid-template-columns: auto auto auto;
        justify-content: space-between;

        @media (min-width: 700px) {
            grid-template-columns: auto auto 1fr;
        }

        .ratio__small, .ratio__large {
            svg {
                margin-top: -4px;
                position: relative;
                top: 3px;
            }
        }
    }
}
</style>
