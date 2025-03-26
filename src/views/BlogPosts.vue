<template>
  <div>
    <div v-if="searchQuery" class="search-results">
      <h2>Search Results for: {{ searchQuery }}</h2>
      <p v-if="filteredPosts.length === 0">No posts found matching your search.</p>
    </div>

    <div class="categories-filter">
      <button
        v-for="category in availableCategories"
        :key="category"
        :class="{ active: activeCategory === category }"
        @click="filterByCategory(category)"
        class="category-btn">
        {{ category }}
      </button>
      <button
        :class="{ active: activeCategory === null }"
        @click="filterByCategory(null)"
        class="category-btn">
        All
      </button>
    </div>

    <div v-for="(posts, category) in groupedPosts" :key="category" class="category-section">
      <div class="category-header">
        <h2 class="category-title">{{ category }}</h2>
        <div class="scroll-controls">
          <button class="scroll-btn prev" @click="scrollCategory('left', category)">
            &lt;
          </button>
          <button class="scroll-btn next" @click="scrollCategory('right', category)">
            &gt;
          </button>
        </div>
      </div>
      <div class="posts-container">
        <div :ref="'posts-row-' + category" class="posts-row">
          <article v-for="post in posts" :key="post.id" class="post">
            <div class="post-thumbnail" :style="{ backgroundColor: post.thumbnail || '#cccccc' }"></div>
            <div class="post-content">
              <h3>{{ post.title }}</h3>
              <p class="post-meta">Posted on {{ post.date }}</p>
              <p class="post-excerpt">{{ trimmedContent(post.content) }}</p>

              <div class="post-actions">
                <router-link :to="'/post/' + post.id" class="read-more">Read More →</router-link>
                <div class="likes-container">
                  <button class="like-button" @click="likePost(post)">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="heart-icon" :class="{ 'liked': likedPosts.includes(post.id) }">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                  </button>
                  <span class="likes-count">{{ post.likes + (likedPosts.includes(post.id) ? 1 : 0) }}</span>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { blogPosts } from '../data/blogPosts.js'
export default {
  name: 'BlogPosts',
  props: {
    searchQuery: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      scrollAmount: 350, // Amount to scroll on each button click
      activeCategory: null,
      likedPosts: [] // Track liked posts by ID
    }
  },
  computed: {
    availableCategories() {
      const categories = new Set();
      blogPosts.forEach(post => {
        if (post.category) {
          categories.add(post.category);
        }
      });
      return Array.from(categories);
    },
    filteredPosts() {
      let posts = blogPosts;

      // First filter by category if one is selected
      if (this.activeCategory) {
        posts = posts.filter(post => post.category === this.activeCategory);
      }

      // Then filter by search term if provided
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase();
        return posts.filter(post =>
          post.title.toLowerCase().includes(query) ||
          post.summary?.toLowerCase().includes(query) ||
          post.category?.toLowerCase().includes(query) ||
          post.content.toLowerCase().includes(query)
        );
      }

      return posts;
    },
    groupedPosts() {
      const grouped = {};
      this.filteredPosts.forEach(post => {
        const category = post.category || 'Uncategorized';
        if (!grouped[category]) {
          grouped[category] = [];
        }
        grouped[category].push(post);
      });
      return grouped;
    },
    displayPosts() {
      return this.filteredPosts;
    }
  },
  methods: {
    filterByCategory(category) {
      this.activeCategory = category;
    },
    scrollCategory(direction, category) {
      const scrollContainer = this.$refs[`posts-row-${category}`][0];

      if (scrollContainer) {
        const scrollAmount = direction === 'left' ? -this.scrollAmount : this.scrollAmount;

        // Calculate the current scroll position and maximum scroll position
        const currentScroll = scrollContainer.scrollLeft;
        const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;

        // Calculate the new scroll position
        let newScrollPosition = currentScroll + scrollAmount;

        // Ensure the new position doesn't go out of bounds
        newScrollPosition = Math.max(0, Math.min(newScrollPosition, maxScroll));

        // Smooth scroll to the new position
        scrollContainer.scrollTo({
          left: newScrollPosition,
          behavior: 'smooth'
        });
      }
    },
    likePost(post) {
      if (this.likedPosts.includes(post.id)) {
        // Unlike the post
        this.likedPosts = this.likedPosts.filter(id => id !== post.id);
      } else {
        // Like the post
        this.likedPosts.push(post.id);
      }

      // Store liked posts in localStorage to persist between sessions
      localStorage.setItem('likedPosts', JSON.stringify(this.likedPosts));
    },
    trimmedContent(content) {
      return content.length > 120 ? content.substring(0, 120) + '...' : content;
    }
  },
  mounted() {
    // Load liked posts from localStorage
    const storedLikes = localStorage.getItem('likedPosts');
    if (storedLikes) {
      try {
        this.likedPosts = JSON.parse(storedLikes);
      } catch (e) {
        console.error('Could not parse liked posts', e);
      }
    }
  }
}
</script>

<style scoped>
.category-section {
  margin-bottom: 40px;
  position: relative;
}

.category-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.category-title {
  border-bottom: 2px solid #333; /* Changed from #1e90ff (blue) to #333 (black) */
  padding-bottom: 8px;
  color: #333;
  flex: 1;
  font-family: var(--font-garamond);
  font-weight: 600;
}

.scroll-controls {
  display: flex;
  gap: 5px; /* Reduced gap from 10px to 5px */
}

.scroll-btn {
  background-color: transparent;
  color: #999; /* Changed from black to grey */
  border: 1px solid #ddd; /* Added thin border */
  width: 24px; /* Reduced from 36px to 24px */
  height: 24px; /* Reduced from 36px to 24px */
  font-size: 14px; /* Reduced from 18px to 14px */
  font-weight: normal; /* Changed from bold to normal */
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 0;
  border-radius: 50%; /* Made buttons circular */
}

.scroll-btn:hover {
  background-color: #f0f0f0; /* Light grey background on hover */
  color: #666; /* Darker text on hover */
  transform: scale(1.1); /* Reduced transform scale from 1.2 to 1.1 */
}

.scroll-btn:active {
  transform: scale(0.95);
}

.posts-container {
  position: relative;
  overflow: hidden;
  width: 100%;
}

.posts-row {
  display: flex;
  overflow: hidden; /* Change from overflow-x: auto to overflow: hidden */
  scroll-behavior: smooth;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  transition: transform 0.2s, box-shadow 0.2s;
  background-color: white;
}

.post {
  flex: 0 0 300px; /* Make sure each post has a fixed width */
  margin-right: 20px; /* Add margin between posts */
  border: 1px solid #eee;
  border-radius: 5px;
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
  box-sizing: border-box;
  background-color: white;
}

.post-thumbnail {
  width: 100%;
  height: 150px;
  background-color: #cccccc;
}

.post-content {
  padding: 15px;
}

.post:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

.post h3 {
  margin-top: 0;
  color: #333; /* Changed from #1e90ff (blue) to #333 (black) */
  font-family: var(--font-garamond);
  font-weight: 500;
}

.post-meta {
  color: #777;
  font-size: 0.9em;
  margin-bottom: 10px;
  font-family: var(--font-cormorant);
}

.read-more {
  display: inline-block;
  margin-top: 10px;
  color: #777; /* Changed from #1e90ff to grey */
  font-weight: normal; /* Changed from bold to normal */
  font-size: 0.9em; /* Slightly smaller text */
  font-style: italic; /* Added italic for caption style */
  text-decoration: none; /* Remove underline */
}

.read-more:hover {
  color: #555; /* Darker on hover */
  text-decoration: underline; /* Add underline only on hover */
}

.search-results {
  background-color: #f1f1f1;
  padding: 15px;
  border-radius: 5px;
  margin-bottom: 20px;
}

.categories-filter {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
}

.category-btn {
  padding: 8px 16px;
  border: 1px solid #ddd;
  background-color: white;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: var(--font-cormorant);
}

.category-btn:hover {
  background-color: #f0f0f0;
}

.category-btn.active {
  background-color: #333; /* Changed from #1e90ff (blue) to #333 (black) */
  color: white;
  border-color: #333; /* Changed from #1e90ff to #333 to match background */
}

.post-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;
}

.likes-container {
  display: flex;
  align-items: center;
  gap: 5px;
}

.like-button {
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s;
}

.like-button:hover {
  transform: scale(1.2);
}

.heart-icon {
  color: #999;
  transition: all 0.3s;
}

.heart-icon.liked {
  fill: #ff4757;
  color: #ff4757;
}

.likes-count {
  font-size: 14px;
  color: #666;
}

.post-excerpt {
  margin-bottom: 10px;
  color: #333;
  line-height: 1.5;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  font-family: var(--font-cormorant);
}

@media (max-width: 768px) {
  .post {
    flex: 0 0 270px;
    margin-right: 15px; /* Slightly smaller margin on mobile */
  }

  .post-thumbnail {
    height: 120px;
  }

  .scroll-btn {
    width: 22px; /* Reduced from 30px to 22px */
    height: 22px; /* Reduced from 30px to 22px */
    font-size: 12px; /* Reduced from 16px to 12px */
  }
}
</style>