<template>
   <div>
     <div v-for="(item, idx) in items"  @click="useRouter().push(item.url)">
      Go to {{ item.name }}
    </div>
   </div> 
</template>


<script setup>


const items = ref([
  {name : "Balls", url : 'balls'},
  {name : "Move Map", url : 'movemap'},
])
</script>
