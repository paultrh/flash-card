<template>
  <div class="dashboard">
    <section class="section">
      <div class="container box">
        <div class="columns">
          <div class="column">
            <aside class="menu">
              <p class="menu-label">Menu</p>
              <ul class="menu-list">
                <li v-for="(routeName, title) in menuItems">
                  <router-link :to="{ name: routeName }">{{ title }}</router-link>
                </li>
              </ul>
            </aside>
          </div>
          <div class="column is-9">
            <router-view></router-view>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  export default {
    name: 'Dashboard',
    data() {
      return {
        menuItems: {
          'Mes classes': 'GroupList',
        },
      };
    },
  };
</script>
