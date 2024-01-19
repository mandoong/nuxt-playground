<template>
  <div @click="f_goBack">
    Go Back
  </div>

  <slot />
</template>


<script setup>

const router = useRouter()


const f_goBack = () => {
  return router.back()
}

</script>