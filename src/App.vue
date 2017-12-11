<template>
  <div id="app">
    <nav class="navbar has-shadow" role="navigation" aria-label="main navigation">
      <div class="navbar-brand container">
        <router-link :to="{ name: 'GroupList' }" class="navbar-item">
          <p class="logo-text has-text-grey-dark">Flash Cards</p>
        </router-link>
      </div>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
};
</script>

<style>
  body {
    height: 100vh;
    background-color: hsl(0, 0%, 96%);
  }
  .container, .column {
    background-color: white;
  }
  .column-menu {
    border-right: solid 1px hsl(0, 0%, 93%);
    min-height: 500px;
  }
  .column {
    padding: 0;
  }
  aside.menu {
    padding: 20px;
    min-height: 80vh;
    height: auto;
  }
  .hero {
    margin: -0.5rem -0.5rem 0 0;
  }
  .logo-text {
    font-size: 25px;
    text-transform: uppercase;
  }
</style>

