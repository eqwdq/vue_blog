<template>
  <div class="contact">
    <h1>Contact Us</h1>
    <p>Have questions or suggestions? Get in touch with us.</p>

    <form class="contact-form">
      <div class="form-group">
        <label for="name">Name</label>
        <input type="text" id="name" name="name" placeholder="Your Name">
      </div>

      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" id="email" name="email" placeholder="Your Email">
      </div>

      <div class="form-group">
        <label for="message">Message</label>
        <textarea id="message" name="message" rows="5" placeholder="Your Message"></textarea>
      </div>

      <button type="submit" class="submit-btn">Send Message</button>
    </form>
  </div>
</template>

<style scoped>
.contact {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  font-family: var(--font-cormorant);
}

h1 {
  margin-bottom: 20px;
}

.contact-form {
  margin-top: 30px;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
}

input, textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  font-family: var(--font-cormorant);
}

textarea {
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
}

.submit-btn:hover {
  background-color: #187bcd;
}
</style>
