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
            <div class="post-thumbnail">
                 <img
                   :src="post.thumbnail"
                     width="300"
                     height="150"
                   :alt="post.title"
                   loading="lazy"
                   @error="handleImageError"
                 >
                 </div>
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
import { blogPosts } from '../data/blogPosts.js';

const PLACEHOLDER_W = '300';
const PLACEHOLDER_H = '150';

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
       scrollAmount: 350,
       activeCategory: null,
       likedPosts: []
     }
  },
  computed: {
      availableCategories() {
       const categories = new Set();
       blogPosts.forEach(post => {
         if (post && post.category) {
           categories.add(post.category);
         }
       });
       return Array.from(categories);
     },
     filteredPosts() {
       let posts = blogPosts.filter(post => post != null);
       if (this.activeCategory) {
         posts = posts.filter(post => post.category === this.activeCategory);
       }
       if (this.searchQuery) {
         const query = this.searchQuery.toLowerCase();
         posts = posts.filter(post =>
           (post.title && post.title.toLowerCase().includes(query)) ||
           (post.summary && post.summary.toLowerCase().includes(query)) ||
           (post.category && post.category.toLowerCase().includes(query)) ||
           (post.content && post.content.toLowerCase().includes(query))
         );
       }
       return posts;
     },
     groupedPosts() {
       const grouped = {};
       this.filteredPosts.forEach(post => {
         if (post) {
             const category = post.category || 'Uncategorized';
             if (!grouped[category]) {
               grouped[category] = [];
             }
             grouped[category].push(post);
          }
       });
       return grouped;
     },
  },
  methods: {
      filterByCategory(category) {
       this.activeCategory = category;
     },
     scrollCategory(direction, category) {
        const scrollContainer = this.$refs[`posts-row-${category}`]?.[0];
        if (scrollContainer) {
            const postElement = scrollContainer.querySelector('.post');
            const postWidth = postElement ? postElement.offsetWidth : parseInt(PLACEHOLDER_W, 10);
            const postMargin = postElement ? parseFloat(window.getComputedStyle(postElement).marginRight) : 20;
            const scrollStep = postWidth + postMargin;
            const scrollAmount = direction === 'left' ? -scrollStep : scrollStep;
            const currentScroll = scrollContainer.scrollLeft;
            const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
            let newScrollPosition = Math.max(0, Math.min(currentScroll + scrollAmount, maxScroll));
            scrollContainer.scrollTo({ left: newScrollPosition, behavior: 'smooth' });
        }
    },
     likePost(post) {
       if (!post || !post.id) return;
       if (this.likedPosts.includes(post.id)) {
         this.likedPosts = this.likedPosts.filter(id => id !== post.id);
       } else {
         this.likedPosts.push(post.id);
       }
       localStorage.setItem('likedPosts', JSON.stringify(this.likedPosts));
     },
     trimmedContent(content) {
        if (!content) return '';
        const maxLength = 120;
        return content.length > maxLength ? content.substring(0, maxLength) + '...' : content;
     },
    handleImageError(event) {
      console.warn(`Image failed to load: ${event.target.src}. Replacing with placeholder.`);
      event.target.src = `https://via.placeholder.com/${PLACEHOLDER_W}x${PLACEHOLDER_H}?text=Image+Error`;
      event.target.onerror = null;
    },

  },
  mounted() {
     const storedLikes = localStorage.getItem('likedPosts');
     if (storedLikes) {
       try {
         const parsedLikes = JSON.parse(storedLikes);
         if (Array.isArray(parsedLikes)) {
             this.likedPosts = parsedLikes;
         } else {
             this.likedPosts = [];
         }
       } catch (e) {
         console.error('Could not parse liked posts', e);
         this.likedPosts = [];
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
  border-bottom: 2px solid #333;
  padding-bottom: 8px;
  color: #333;
  flex: 1;
  font-family: var(--font-garamond);
  font-weight: 600;
}
.scroll-controls {
  display: flex;
  gap: 5px;
}
.scroll-btn {
  background-color: transparent;
  color: #999;
  border: 1px solid #ddd;
  width: 24px;
  height: 24px;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 0;
  border-radius: 50%;
}
.scroll-btn:hover {
  background-color: #f0f0f0;
  color: #666;
  transform: scale(1.1);
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
  overflow-x: auto;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  padding: 20px 0;
   scrollbar-width: none;
   -ms-overflow-style: none;
}
.posts-row::-webkit-scrollbar {
    display: none;
}
.post {
  flex: 0 0 300px;
  margin-right: 20px;
  border: 1px solid #eee;
  border-radius: 5px;
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
  box-sizing: border-box;
  background-color: white;
  white-space: normal;
}
.post:first-child {
    margin-left: 20px;
}
.post:last-child {
    margin-right: 20px;
}

.post-thumbnail {
  margin-bottom: 15px;
  width: 100%;
  height: 150px;
  background-color: #cccccc;
  display: block;
}
.post-thumbnail img {
  display: block;
  object-fit: cover;
}
.post-content {
  padding: 0 15px 15px 15px;
}
.post:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}
.post h3 {
  margin-top: 0;
  margin-bottom: 10px;
  color: #333;
  font-family: var(--font-garamond);
  font-weight: 500;
  font-size: 1.1em;
  line-height: 1.3;
}
.post-meta {
  color: #777;
  font-size: 0.85em;
  margin-bottom: 10px;
  font-family: var(--font-cormorant);
}
.read-more {
  display: inline-block;
  margin-top: 10px;
  color: #777;
  font-weight: normal;
  font-size: 0.9em;
  font-family: var(--font-cormorant);
  font-style: italic;
  text-decoration: none;
}
.read-more:hover {
  color: #555;
  text-decoration: underline;
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
  margin-bottom: 30px;
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
  background-color: #333;
  color: white;
  border-color: #333;
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
  transition: all 0.3s ease;
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
  color: #555;
  line-height: 1.5;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  font-family: var(--font-cormorant);
  font-size: 0.95em;
  min-height: calc(1.5em * 3);
}

@media (max-width: 768px) {
  .post {
    flex: 0 0 270px;
    margin-right: 15px;
  }
  .post:first-child {
    margin-left: 15px;
  }
  .post:last-child {
      margin-right: 15px;
  }
  .post-thumbnail {
    height: 120px;
  }
  .scroll-btn {
    width: 22px;
    height: 22px;
    font-size: 12px;
  }
   .category-title {
        font-size: 1.1em;
    }
     .post h3 {
        font-size: 1em;
    }
    .post-excerpt {
        font-size: 0.9em;
        -webkit-line-clamp: 2;
        min-height: calc(1.5em * 2);
    }
     .post-meta {
        font-size: 0.8em;
    }
}
</style>