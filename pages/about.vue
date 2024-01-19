<template>
    <div>{{ data.count }}</div>
    <add></add>
    <button @click="addCount"> Add</button>
</template>

<script setup>
import add from '../components/add.vue'

const data = useCount()


const addCount = () => {
    useAddCount()
}
</script>