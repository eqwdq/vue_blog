<template>
  <header class="main-header">
    <div class="header-content">
      <div class="logo-title">
        <div class="logo"></div>
        <router-link to="/" class="blog-title-link">
          <h1 class="blog-title">My Blog</h1>
        </router-link>
      </div>
      <div class="header-right">
        <nav class="nav-links">
          <router-link to="/about" class="nav-link">About</router-link>
          <router-link to="/contact" class="nav-link">Contact</router-link>
          <router-link to="/pricing" class="nav-link">Pricing</router-link>
        </nav>
        <SearchBar @search="onSearch" ref="searchBar" />
        <router-link to="/profile" class="profile-link">
          <button class="profile-button"></button>
        </router-link>
      </div>
    </div>
  </header>
</template>

<script>
import SearchBar from './SearchBar.vue'

export default {
  name: 'AppHeader',
  components: {
    SearchBar
  },
  methods: {
    onSearch(query) {
      this.$emit('search', query)
    }
  }
}
</script>

<style scoped>
.main-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  z-index: 1000;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 30px;
  max-width: 100%;
  margin: 0 auto;
}

.header-right {
  display: flex;
  align-items: center;
}

.nav-links {
  display: flex;
  gap: 20px;
  margin-right: 30px;
}

.search-box {
  margin-right: 30px;
}

.profile-button {
  width: 40px;
  height: 40px;
  background-color: #888;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s ease;
  margin: 0;
}

.nav-link {
  color: #333;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
}

.nav-link:hover {
  color: #1e90ff;
}

.logo-title {
  display: flex;
  align-items: center;
  gap: 15px;
}

.logo {
  width: 40px;
  height: 40px;
  background-color: #777;
  border-radius: 4px;
}

.blog-title-link {
  text-decoration: none;
}

.blog-title {
  margin: 0;
  font-weight: 700;
  font-size: 24px;
  color: #333;
  transition: color 0.2s;
  font-family: var(--font-garamond);
}

.blog-title:hover {
  color: #1e90ff;
}

.profile-button:hover {
  background-color: #666;
}

.profile-button svg {
  color: white;
}

.profile-link {
  display: flex;
  align-items: center;
  margin-right: 5px;
  margin-left: 35px;
}

@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    align-items: center;
    gap: 10px;
    padding: 15px 25px;
  }

  .header-right {
    flex-direction: column;
    gap: 15px;
    width: 100%;
  }

  .nav-links {
    width: 100%;
    justify-content: center;
  }

  .logo-title {
    width: 100%;
    justify-content: center;
  }

  .profile-button {
    padding: 6px 12px;
    width: 100%;
    justify-content: center;
  }
}
</style>
