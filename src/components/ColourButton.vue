<script setup lang="ts">
import type { Colour } from '../types/types';

const props = defineProps<{
    class: string;
    colour: Colour;
}>();

const emits = defineEmits<{
    (e: 'click', colourValue: string): void;
}>();
</script>

<template>
    <div :class="props.class">
        <button @click="$emit('click', props.colour.hex)" :class="props.colour.name">
            <span class="sr-only">{{ props.colour.name }}</span>
        </button>
    </div>
</template>
