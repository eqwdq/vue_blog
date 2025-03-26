<template>
    <div class="blog-post-preview">
        <h3>{{ post.title }}</h3>
        <p>{{ post.content }}</p>
        <a :href="post.readMoreLink">Read More →</a>
    </div>
</template>

<script>
export default {
    props: {
        post: {
            type: Object,
            required: true
        }
    }
}
</script>

<style scoped>
.blog-post-preview {
    border: 1px solid #ddd;
    padding: 15px;
    margin-bottom: 15px;
    border-radius: 5px;
}

.blog-post-preview h3 {
    margin-top: 0;
    margin-bottom: 5px;
    font-size: 1.2em;
}

.blog-post-preview a {
    display: inline-block;
    margin-top: 10px;
}
</style>
