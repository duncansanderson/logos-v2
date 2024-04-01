<script setup lang="ts">
const props = defineProps<{
    class: string;
    colourName: string;
}>();

const emits = defineEmits<{
    (e: 'click', colourValue: string): void;
}>();
</script>

<template>
    <div :class="props.class" data-test="colour-button">
        <button @click="$emit('click', props.colourName)" :class="props.colourName">
            <span class="sr-only">{{ props.colourName }}</span>
        </button>
    </div>
</template>

<style lang="scss" scoped>
.colour-picker__colour {
    align-items: center;
    border: 2px solid transparent;
    border-radius: 50%;
    display: flex;
    height: 70px;
    justify-content: center;
    width: 70px;

    &.active {
        border: 2px solid black;
    }

    button {
        border: none;
        border-radius: 50%;
        cursor: pointer;
        height: 60px;
        width: 60px;

        &:focus {
            outline: 0;
            border: 2px solid blue;
        }

        &.transparent {
            background-image: url(../assets/transparent.png);
        }

        &.blue-sky {
            background-color: var(--blue-sky);
        }

        &.buddy-gold {
            background-color: var(--buddy-gold);
        }

        &.calm-blue {
            background-color: var(--calm-blue);
        }

        &.claeys-cream {
            background-color: var(--claeys-cream);
        }

        &.heartland-yellow {
            background-color: var(--heartland-yellow);
        }

        &.river-blue {
            background-color: var(--river-blue);
        }

        &.rust-belt {
            background-color: var(--rust-belt);
        }

        &.strato-blue {
            background-color: var(--strato-blue);
        }

        &.truman-brown {
            background-color: var(--truman-brown);
        }
    }
}
</style>
