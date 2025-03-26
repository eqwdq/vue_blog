<template>
  <div class="search-box">
    <svg class="search-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="11" cy="11" r="8"></circle>
      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
    <input
      type="text"
      v-model="searchQuery"
      placeholder="Search posts..."
      @input="handleSearch"
      ref="searchInput"
    >
  </div>
</template>

<script>
export default {
  name: 'SearchBar',
  data() {
    return {
      searchQuery: ''
    }
  },
  methods: {
    handleSearch() {
      // Emit search event immediately without debouncing
      this.$emit('search', this.searchQuery.trim());
    },
    focusInput() {
      this.$nextTick(() => {
        if (this.$refs.searchInput) {
          this.$refs.searchInput.focus();
        }
      });
    },
    clearSearch() {
      this.searchQuery = '';
    }
  }
}
</script>

<style scoped>
.search-box {
  position: relative;
  width: 250px;
}

.search-icon {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #999;
  pointer-events: none;
}

.search-box input {
  width: 100%;
  padding: 8px 12px 8px 36px;
  border: 1px solid #ddd;
  border-radius: 20px;
  font-size: 14px;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  font-family: var(--font-cormorant);
}

.search-box input:focus {
  outline: none;
  border-color: #1e90ff;
  box-shadow: 0 0 0 2px rgba(30,144,255,0.2);
}
</style>
