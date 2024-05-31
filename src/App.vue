<script setup lang="ts">
import ColourPicker from './components/ColourPicker.vue';
import ImageBox from './components/ImageBox.vue';
</script>

<template>
    <main>
        <ImageBox />
        <ColourPicker />
    </main>
</template>

<style scoped>
main {
    display: grid;
    grid-gap: 50px;

    @media (min-width: 700px) {
        grid-template-columns: 1fr 300px;
    }
}
</style>
