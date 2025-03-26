<template>
  <div class="app-container">
    <AppHeader @search="performSearch" />
    <main class="content">
      <router-view :search-query="searchQuery" />
    </main>
  </div>
</template>

<script>
import AppHeader from './components/AppHeader.vue'

export default {
  name: 'App',
  components: { AppHeader },
  data() {
    return {
      searchQuery: ''
    }
  },
  methods: {
    performSearch(query) {
      this.searchQuery = query;
      // Navigate to home when searching
      if (this.$route.path !== '/') {
        this.$router.push('/');
      }
    }
  }
}
</script>

<style>
:root {
  --font-garamond: 'EB Garamond', serif;
  --font-cormorant: 'Cormorant Garamond', serif;
}

.app-container {
  min-height: 100vh;
  background: #fff;
  position: relative;
  font-family: var(--font-cormorant);
}

.content {
  padding: 30px;
  margin-top: 70px;
  max-width: 100%;
  margin-left: auto;
  margin-right: auto;
  background: #fff;
  border-radius: 0;
  box-shadow: none;
}

.search-results {
  background-color: #f1f1f1;
  padding: 15px;
  border-radius: 5px;
  margin-bottom: 20px;
}

@media (max-width: 768px) {
  .content {
    margin-top: 150px;
  }
}

html, body {
  margin: 0;
  padding: 0;
  font-family: var(--font-cormorant);
  font-size: 18px;
  color: #333;
  line-height: 1.5;
}

h1, h2, h3, h4, h5, h6 {
  font-weight: 500;
}
</style>