<template>
    <div class="blog-carousel">
        <h2>Blog Posts</h2>
        <div class="posts-container">
            <BlogPostPreview v-for="post in posts" :key="post.id" :post="post" />
        </div>
    </div>
</template>

<script>
import BlogPostPreview from './BlogPostPreview.vue';
import { blogPosts } from '../data/blogPosts.js';

export default {
    components: {
        BlogPostPreview
    },
    data() {
        return {
            posts: blogPosts
        };
    }
}
</script>

<style scoped>
.blog-carousel {
    margin-bottom: 30px;
}

.blog-carousel h2 {
    margin-bottom: 20px;
}

.posts-container {
    display: flex;
    flex-direction: column; /* Stack posts vertically */
}
</style>
