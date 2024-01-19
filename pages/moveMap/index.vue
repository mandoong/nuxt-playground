<template>
  <canvas ref="r_canvas" width="500" height="500" /> 
</template>

<script setup>
const r_canvas = ref()

const $ = ref()
const shapes = ref()

const getRect = (x, y, w, h, color) => {
    return {
      type: 'Rect',
      x, y, w, h, color
    }
  }

const colors = [
  'lightRed',
  'lightBlue',
  'lightGray',
  'lightYellow',
]

const mainRectSize = 10
const mapSize = 1000
const viewSize = 200

const f_draw = () => {
 
  $.value.clearRect(0, 0, r_canvas.value.offsetWidth, r_canvas.value.offsetHeight)
  
  if (shapes.value.length) {
    shapes.value.forEach(e => {
      if (e.type === 'Rect') {
        if (e.x < -viewSize) {
          e.x = e.x + mapSize
        } 

        if (e.x > mapSize - viewSize) {
          e.x = -viewSize
        }

        if (e.y < -viewSize) {
          e.y = e.y + mapSize
        } 

        if (e.y > mapSize - viewSize) {
          e.y = -viewSize
        }


        let { x, y, w, h } = e

        $.value.fillStyle = e.color
        $.value.fillRect(x, y, w, h) 
      }
    })
  }

  $.value.fillStyle = 'red'
  $.value.fillRect(Math.round(r_canvas.value.offsetWidth/ 2) -mainRectSize, Math.round(r_canvas.value.offsetHeight/ 2) -mainRectSize, mainRectSize * 2, mainRectSize * 2) 
}

const moveDirection = {
  w: {x: 0, y: 1},
  s: {x: 0, y: -1},
  a: {x: 1, y: 0},
  d: {x: -1, y: 0},
}

const moveSpeed = 10

const moveStart = ref(false)
const keyTmp = ref()

const f_move = (evt) => {
  if (moveStart.value) {
    const key = evt?.key?.toLowerCase()
    if(key) keyTmp.value = key
    
    const direction = key ?  moveDirection?.[key] : moveDirection?.[keyTmp.value]

    if (direction) {
      shapes.value = shapes.value.map(e => {
        return {
          ...e,
          x: e.x + (direction.x * moveSpeed),
          y: e.y + (direction.y * moveSpeed),
        }
      })
    }
    f_draw()

    window.requestAnimationFrame((evt) => f_move(evt))
  }
}
const keyDown = ref(false)
const moveMap = (evt) => {
  keyDown.value = true

  if (!moveStart.value) {
    moveStart.value = true
    f_move(evt)
  }
}

const f_moveStop = () => {
  moveStart.value = false
}



onMounted(() => {
  $.value = r_canvas.value.getContext("2d")

  shapes.value = Array(20).fill(null).map(() => {
    const [x, y] = [Math.round(Math.random() * mapSize), Math.round(Math.random() * mapSize)]
    const [w, h] = [Math.round(Math.random() * 100) + 30, Math.round(Math.random() * 100) + 30]
    const idx = Math.floor(Math.random() * 3)
    return getRect(x, y, w, h, colors[idx])
    
  })

  console.log(shapes.value);

  f_draw()

  window.addEventListener('keypress', moveMap)
  window.addEventListener('keyup', f_moveStop)
  
})

onBeforeUnmount(() => {
  window.removeEventListener('keypress', moveMap)
  window.removeEventListener('keyup', f_moveStop)
})

</script>

<style lang="scss" scoped> 

</style>