<template>
  <div class="post-detail">
    <button @click="goBack" class="back-button">← Back</button>
    <article v-if="post">
      <div class="post-thumbnail">
              <img
                :src="post.thumbnail"
                :alt="post.title"
                @error="handleImageError">
            </div>
            <div class="post-header">
        <h1>{{ post.title }}</h1>
        <div class="likes-container">
          <button class="like-button" @click="toggleLike">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="heart-icon" :class="{ 'liked': isLiked }">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </button>
          <span class="likes-count">{{ totalLikes }}</span>
        </div>
      </div>
      <div class="post-meta">
        <span v-if="post.date">Posted on {{ post.date }}</span>
        <span v-if="post.category">in {{ post.category }}</span>
      </div>
      <p class="content">{{ post.content }}</p>

      <section class="comments-section">
        <h2>Comments ({{ commentsCount }})</h2>

        <div class="comment-form">
          <h3>Leave a Comment</h3>
          <form @submit.prevent="submitComment">
            <div class="form-group">
              <label for="author">Name</label>
              <input
                type="text"
                id="author"
                v-model="newComment.author"
                required
                placeholder="Your name"
              >
            </div>
            <div class="form-group">
              <label for="comment">Comment</label>
              <textarea
                id="comment"
                v-model="newComment.text"
                required
                placeholder="Your comment"
                rows="4"
              ></textarea>
            </div>
            <button type="submit" class="submit-btn">Post Comment</button>
          </form>
        </div>

        <div class="comments-list" v-if="commentsCount > 0">
          <div v-for="comment in post.comments" :key="comment.id" class="comment">
            <div class="comment-header">
              <strong>{{ comment.author }}</strong>
              <span class="comment-date">{{ comment.date }}</span>
            </div>
            <p class="comment-text">{{ comment.text }}</p>
          </div>
        </div>
        <p v-else class="no-comments">Be the first to leave a comment!</p>
      </section>
    </article>
    <div v-else class="error">
      Post not found
    </div>
  </div>
</template>

<script>
import { ref, computed, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { blogPosts } from '../data/blogPosts.js'

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();

    const postId = parseInt(route.params.id);
    const post = blogPosts.find(p => p.id === postId);

    const newComment = reactive({
      author: '',
      text: ''
    });

    const getLikedPosts = () => {
      try {
        const storedLikes = localStorage.getItem('likedPosts');
        return storedLikes ? JSON.parse(storedLikes) : [];
      } catch (e) {
        console.error('Could not parse liked posts', e);
        return [];
      }
    };

    const likedPosts = ref(getLikedPosts());

    const isLiked = computed(() => {
      return likedPosts.value.includes(postId);
    });

    const totalLikes = computed(() => {
      return post ? post.likes + (isLiked.value ? 1 : 0) : 0;
    });

    const toggleLike = () => {
      if (isLiked.value) {
        likedPosts.value = likedPosts.value.filter(id => id !== postId);
      } else {
        likedPosts.value.push(postId);
      }

      localStorage.setItem('likedPosts', JSON.stringify(likedPosts.value));
    };

    const goBack = () => router.back();

    const commentsCount = computed(() => {
      return post ? post.comments.length : 0;
    });

    const submitComment = () => {
      if (!post) return;

      const comment = {
        id: Date.now(),
        author: newComment.author,
        date: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }),
        text: newComment.text
      };

      post.comments.push(comment);

      newComment.author = '';
      newComment.text = '';
    };

    return {
      post,
      goBack,
      isLiked,
      totalLikes,
      toggleLike,
      newComment,
      submitComment,
      commentsCount
    };
  }
}
</script>

<style scoped>
.post-detail {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.post-thumbnail {
  width: 100%;
  height: 250px;
  margin-bottom: 20px;
  border-radius: 8px;
}

.back-button {
  margin-bottom: 20px;
  padding: 8px 16px;
  border: none;
  background: #1e90ff;
  color: white;
  border-radius: 4px;
  cursor: pointer;
}

.post-meta {
  color: #666;
  margin: 10px 0 20px;
  font-family: var(--font-cormorant);
}

.content {
  line-height: 1.6;
  font-family: var(--font-cormorant);
  font-size: 1.1rem;
}

.error {
  color: red;
  text-align: center;
  margin-top: 20px;
}

.post-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.post-header h1 {
  font-family: var(--font-garamond);
  font-weight: 600;
  margin-top: 0;
}

.likes-container {
  display: flex;
  align-items: center;
  gap: 8px;
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
  color: #666;
  transition: all 0.3s;
}

.heart-icon.liked {
  fill: #ff4757;
  color: #ff4757;
}

.likes-count {
  font-size: 16px;
  font-weight: 500;
  color: #666;
}

.comments-section {
  margin-top: 40px;
  border-top: 1px solid #eee;
  padding-top: 20px;
}

.comments-section h2 {
  font-size: 1.5rem;
  margin-bottom: 20px;
}

.comment-form {
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 30px;
}

.comment-form h3 {
  margin-top: 0;
  font-size: 1.2rem;
  margin-bottom: 15px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

.form-group textarea {
  resize: vertical;
}

.submit-btn {
  background-color: #1e90ff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
}

.submit-btn:hover {
  background-color: #187bcd;
}

.comments-list {
  margin-top: 30px;
}

.comment {
  padding: 15px;
  border-bottom: 1px solid #eee;
  margin-bottom: 15px;
}

.comment:last-child {
  border-bottom: none;
}

.comment-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.comment-date {
  color: #777;
  font-size: 0.9em;
}

.comment-text {
  margin: 0;
  line-height: 1.5;
  font-family: var(--font-cormorant);
}

.no-comments {
  font-style: italic;
  color: #777;
  text-align: center;
  padding: 20px 0;
}
</style>
