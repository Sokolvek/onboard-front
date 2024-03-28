<template>
    <div>
        <h3>Form Answers</h3>
        <ul v-if="props.answers">
            <li class="answer" v-for="(answer,i) in props.answers" :key="i">{{ answer }}</li>
        </ul>
        <p v-else>no answers yet :(</p>
    </div>
</template>

<script setup>

const props = defineProps({
    answers:Array
})
</script>

<style scoped>


.answer{
    list-style: disc;
}
</style>