<script setup lang="ts">
import { computed } from 'vue';
import IconPete from './icons/IconPete.vue';
import { useColourStore } from '../stores/colour';
const store = useColourStore();

const backgroundColour = computed(() => store.backgroundColour);
const foregroundColour = computed(() => store.foregroundColour);
const imageBoxClasses = computed(
    () => `image-box bg-${backgroundColour.value} fg-${foregroundColour.value}`
);
</script>

<template>
    <div :class="imageBoxClasses">
        <IconPete />
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
