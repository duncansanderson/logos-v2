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
    <div :class="props.class">
        <button @click="$emit('click', props.colourName)" :class="props.colourName">
            <span class="sr-only">{{ props.colourName }}</span>
        </button>
    </div>
</template>
