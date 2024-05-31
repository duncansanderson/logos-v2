<script setup lang="ts">
import { computed, ref } from 'vue';
import DownloadOptions from './DownloadOptions.vue';
import { useColourStore } from '../stores/colour';
import displaySize from '@/utils/displaySize';
import IconPete from './icons/IconPete.vue';

const colourStore = useColourStore();

const iconStyle = ref(displaySize(2000, 2000));

const backgroundColour = computed(() => colourStore.backgroundColour);
const foregroundColour = computed(() => colourStore.foregroundColour);
const imageBoxClasses = computed(
    () => `image-box bg-${backgroundColour.value} fg-${foregroundColour.value}`
);

const updateIconSize = (height:number, width:number) => {
    iconStyle.value = displaySize(height, width);
}
</script>

<template>
    <div>
        <div :class="imageBoxClasses" data-test="image-box">
            <div class="image-box__svg">
                <IconPete :style="iconStyle" />
            </div>
        </div>
        <DownloadOptions @update="updateIconSize" />
    </div>
</template>

<style scss scoped>
.image-box {
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: center;
    max-height: 436px;
    position: relative;
    width: 100%;
}

.image-box__svg {
    align-items: center;
    display: flex;
    height: 425px;
    justify-content: center;
}
</style>

<style scss>
.image-box {
    &.bg-blue-sky svg {
    background-color: var(--blue-sky);
    }

    &.fg-blue-sky svg {
        color: var(--blue-sky);
    }

    &.bg-buddy-gold svg {
        background-color: var(--buddy-gold);
    }

    &.fg-buddy-gold svg {
        color: var(--buddy-gold);
    }

    &.bg-calm-blue svg {
        background-color: var(--calm-blue);
    }

    &.fg-calm-blue svg {
        color: var(--calm-blue);
    }

    &.bg-claeys-cream svg {
        background-color: var(--claeys-cream);
    }

    &.fg-claeys-cream svg {
        color: var(--claeys-cream);
    }

    &.bg-heartland-yellow svg {
        background-color: var(--heartland-yellow);
    }

    &.fg-heartland-yellow svg {
        color: var(--heartland-yellow);
    }

    &.bg-river-blue svg {
        background-color: var(--river-blue);
    }

    &.fg-river-blue svg {
        color: var(--river-blue);
    }

    &.bg-rust-belt svg {
        background-color: var(--rust-belt);
    }

    &.fg-rust-belt svg {
        color: var(--rust-belt);
    }

    &.bg-strato-blue svg {
        background-color: var(--strato-blue);
    }

    &.fg-strato-blue svg {
        color: var(--strato-blue);
    }

    &.bg-transparent svg {
        background-color: transparent;
    }

    &.fg-transparent svg {
        color: transparent;
    }

    &.bg-truman-brown svg {
        background-color: var(--truman-brown);
    }

    &.fg-truman-brown svg {
        color: var(--truman-brown);
    }
}

@media (min-width: 700px) {
    svg {
        height: 80%;
    }
}
</style>
