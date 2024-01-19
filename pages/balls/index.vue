<template>
  <div>
      <div id="canv"> </div>
      <div>{{ count }}</div>
  </div>
  <div ref="scene" class="game-container"></div>
  <div @click="f_addBall">Add</div>
  <div @click="f_jumpBall">Jump</div>
  <div @click="f_dachBall">Dash</div>
</template>

<script setup>

definePageMeta({
  layout: 'topnav'
})


import Matter from 'matter-js';


const { Engine, Render, Bodies, World } = Matter;

const data = ref()

const count = useCount()
const scene = ref(null);

const _engine = ref(Matter.Engine.create())
const _ball = ref()


const f_addBall = () => {
  World.add(_engine.value.world, Bodies.circle(30, 30, 10, {
      restitution: 1,
      render: {
          fillStyle: 'white'
      }
  }))
}

const f_jumpBall = () => {
  Matter.Body.applyForce( _ball.value, { x: _ball.value.position.x, y: _ball.value.position.y }, { x: 0, y: -0.01 })
}

const f_rightDachBall = () => {
  Matter.Body.applyForce( _ball.value, { x: _ball.value.position.x, y: _ball.value.position.y }, { x: 0.01, y: 0 })
}
const f_leftDachBall = () => {
  Matter.Body.applyForce( _ball.value, { x: _ball.value.position.x, y: _ball.value.position.y }, { x: -0.01, y: 0 })
}

const f_downBall = () => {
  Matter.Body.applyForce( _ball.value, { x: _ball.value.position.x, y: _ball.value.position.y }, { x: 0, y: 0.05 })
}


const f_keyDown = (evt) => {
  if (evt.key === 'w') return f_jumpBall()
  else if (evt.key === 'd') return f_rightDachBall()
  else if (evt.key === 'a') return f_leftDachBall()
  else if (evt.key === 's') return f_downBall()
}



onMounted(() => {
  const render = Matter.Render.create({
      element: scene.value,
      engine: _engine.value,
      options: {
          width: 800,
          height: 600,
          wireframes: false
      }
  });

  const ground = [
      Bodies.rectangle(400, 0, 800, 50, {
          isStatic: true,
          render: {
              fillStyle: 'gray' 
          }}),
      Bodies.rectangle(400, 600, 800, 50, {
          isStatic: true,
          render: {
              fillStyle: 'gray' 
          }}),
      Bodies.rectangle(0, 300, 50, 600, {
          isStatic: true,
          render: {
              fillStyle: 'gray' 
          }}),
      Bodies.rectangle(800, 300, 50, 600, {
          isStatic: true,
          render: {
              fillStyle: 'gray' 
          }}),
  ]
  const balls = Array(20).fill(null).map((e, i) => {
      return Bodies.circle(i * 30, i, 10, {
      restitution: 1.2, // 반발력 설정
      render: {
          fillStyle: 'white' // 색상 설정
      }
  });

  }) 

  _ball.value = Bodies.circle(30, 30, 10, {
      restitution: 0.5,
      render: {
          fillStyle: 'red'
      }
  })

  balls.forEach((e) => {
          Matter.Body.setVelocity(e, {
          x: Math.min(e.velocity.x, 10),
          y: Math.min(e.velocity.y, 10)
      });
  })

  World.add(_engine.value.world, [...ground, _ball.value, ...balls]);

  Engine.run(_engine.value);
  Render.run(render);


  Matter.Body.setVelocity(_ball.value, {
  x: Math.min(_ball.value.velocity.x, 10),
  y: Math.min(_ball.value.velocity.y, 10)
  });

  window.addEventListener('keydown', f_keyDown)


  
})

</script>

<style lang="scss" scoped>
.game-container {
  width: 800px;
  height: 600px;
  background-color: white;
  }
</style>