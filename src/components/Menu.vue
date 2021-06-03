<template>

  <div>
    <div class="open" @mousemove="update($event)">
      <div id="light"></div>
      <div id="text">
        <router-link to="/menu"><h1 class="textOpen">O<span id="offset">P</span>EN!</h1></router-link>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: "Menu",
  mounted() {
    this.update({clientX: 0, clientY: 0})
  },
  methods: {
    update(e) {
      let x = e.clientX
      let y = e.clientY
      document.documentElement.style.setProperty('--cursorX', x + 'px')
      document.documentElement.style.setProperty('--cursorY', y + 'px')
    }
  }
}
</script>

<style scoped>
:root {
  --cursorX: 80vw;
  --cursorY: 80vh;
}

.open {
  height: 100vh;
  background-image: url("../welcomePizza.jpg");
  background-size: 100% 100%;
  cursor: alias;
  position: relative;
}

#light {
  display: block;
  width: 100%;
  height: 100%;
  position: fixed;
  pointer-events: none;
  z-index: 1;
  background: radial-gradient(
      circle 20vmax at var(--cursorX) var(--cursorY),
      rgba(0, 0, 0, 0) 10%,
      rgba(0, 0, 0, .8) 80%,
      rgba(0, 0, 0, .95) 100%
  )
}

#text {
  text-align: center;
  position: absolute;
  border: 5px solid #1086e8;
  width: 300px;
  top: 150px;
  border-radius: 20px;
  left: 50%;
  margin: -50px 0 0 -150px;
  animation: border-flicker 2s linear infinite;
  cursor: pointer;
}

.textOpen {
  color: #FF00E6;
  font-family: 'Raleway', sans-serif;
  font-size: 64px;
  letter-spacing: 10px;
  animation: text-flicker 3s linear infinite;
}

#offset {
  animation: letter-flicker 2s linear infinite;
}

@keyframes text-flicker {
  0% {
    opacity: 0.1;
    text-shadow: 0px 0px 29px rgba(242, 22, 22, 1);
  }

  2% {
    opacity: 1;
    text-shadow: 0px 0px 29px rgba(242, 22, 22, 1);
  }
  8% {
    opacity: 0.1;
    text-shadow: 0px 0px 29px rgba(242, 22, 22, 1);
  }
  9% {
    opacity: 1;
    text-shadow: 0px 0px 29px rgba(242, 22, 22, 1);
  }
  12% {
    opacity: 0.1;
    text-shadow: 0px 0px rgba(242, 22, 22, 1);
  }
  20% {
    opacity: 1;
    text-shadow: 0px 0px 29px rgba(242, 22, 22, 1)
  }
  25% {
    opacity: 0.3;
    text-shadow: 0px 0px 29px rgba(242, 22, 22, 1)
  }
  30% {
    opacity: 1;
    text-shadow: 0px 0px 29px rgba(242, 22, 22, 1)
  }

  70% {
    opacity: 0.7;
    text-shadow: 0px 0px 29px rgba(242, 22, 22, 1)
  }

  72% {
    opacity: 0.2;
    text-shadow: 0px 0px 29px rgba(242, 22, 22, 1)
  }

  77% {
    opacity: .9;
    text-shadow: 0px 0px 29px rgba(242, 22, 22, 1)
  }
  100% {
    opacity: .9;
    text-shadow: 0px 0px 29px rgba(242, 22, 22, 1)
  }
}

@keyframes border-flicker {
  0% {
    opacity: 0.1;
    -webkit-box-shadow: 0px 0px 78px 4px rgba(16, 134, 232, 0.73);
    -moz-box-shadow: 0px 0px 78px 4px rgba(16, 134, 232, 0.73);
    box-shadow: 0px 0px 78px 4px rgba(16, 134, 232, 0.73);
  }
  2% {
    opacity: 1;
    -webkit-box-shadow: 0px 0px 78px 4px rgba(16, 134, 232, 0.73);
    -moz-box-shadow: 0px 0px 78px 4px rgba(16, 134, 232, 0.73);
    box-shadow: 0px 0px 78px 4px rgba(16, 134, 232, 0.73);
  }
  4% {
    opacity: 0.1;
    -webkit-box-shadow: 0px 0px 78px 4px rgba(16, 134, 232, 0.73);
    -moz-box-shadow: 0px 0px 78px 4px rgba(16, 134, 232, 0.73);
    box-shadow: 0px 0px 78px 4px rgba(16, 134, 232, 0.73);
  }

  8% {
    opacity: 1;
    -webkit-box-shadow: 0px 0px 78px 4px rgba(16, 134, 232, 0.73);
    -moz-box-shadow: 0px 0px 78px 4px rgba(16, 134, 232, 0.73);
    box-shadow: 0px 0px 78px 4px rgba(16, 134, 232, 0.73);
  }
  70% {
    opacity: 0.7;
    -webkit-box-shadow: 0px 0px 78px 4px rgba(16, 134, 232, 0.73);
    -moz-box-shadow: 0px 0px 78px 4px rgba(16, 134, 232, 0.73);
    box-shadow: 0px 0px 78px 4px rgba(16, 134, 232, 0.73);
  }
  100% {
    opacity: 1;
    -webkit-box-shadow: 0px 0px 78px 4px rgba(16, 134, 232, 0.73);
    -moz-box-shadow: 0px 0px 78px 4px rgba(16, 134, 232, 0.73);
    box-shadow: 0px 0px 78px 4px rgba(16, 134, 232, 0.73);
  }
}

@keyframes letter-flicker {
  0% {
    opacity: 0.1;
    text-shadow: 0px 0px 29px rgba(242, 22, 22, 1);
  }
  2% {
    opacity: 0.1;
    text-shadow: 0px 0px 29px rgba(242, 22, 22, 1);
  }
  4% {
    opacity: 1;
    text-shadow: 0px 0px 29px rgba(242, 22, 22, 1);
  }


  19% {
    opacity: 1;
    text-shadow: 0px 0px 29px rgba(242, 22, 22, 1);
  }
  21% {
    opacity: 0.1;
    text-shadow: 0px 0px 29px rgba(242, 22, 22, 1);
  }
  23% {
    opacity: 1;
    text-shadow: 0px 0px 29px rgba(242, 22, 22, 1);
  }

  80% {
    opacity: 1;
    text-shadow: 0px 0px 29px rgba(242, 22, 22, 1);
  }
  83% {
    opacity: 0.4;
    text-shadow: 0px 0px 29px rgba(242, 22, 22, 1);
  }
  87% {
    opacity: 1;
    text-shadow: 0px 0px 29px rgba(242, 22, 22, 1);
  }
}

</style>