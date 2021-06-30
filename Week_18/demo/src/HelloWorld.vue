<template>
    <p>{{ greeting }} World!</p>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
      greeting: {
          type: String,
          default: "Hello"
      }
    }
})
</script>


<style scoped>
p {
    font-size: 2em;
    text-align: center;
}
</style>