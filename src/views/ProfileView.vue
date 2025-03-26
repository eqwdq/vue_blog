<template>
  <div class="profile-page">
    <h1>My Profile</h1>

    <div class="profile-container">
      <div class="profile-header">
        <div class="profile-avatar">
          <div class="avatar-placeholder">
            <span>{{ userInitials }}</span>
          </div>
          <button class="change-avatar-btn">Change Photo</button>
        </div>
        <div class="profile-info">
          <h2>{{ user.name }}</h2>
          <p class="profile-bio">{{ user.bio }}</p>
          <p class="profile-stats">
            <span><strong>{{ postsCount }}</strong> posts</span>
            <span><strong>{{ likesCount }}</strong> likes</span>
            <span><strong>{{ commentsCount }}</strong> comments</span>
          </p>
        </div>
      </div>

      <div class="profile-details">
        <h3>Account Details</h3>
        <form @submit.prevent="saveProfile" class="profile-form">
          <div class="form-group">
            <label for="name">Name</label>
            <input type="text" id="name" v-model="user.name" />
          </div>

          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" v-model="user.email" />
          </div>

          <div class="form-group">
            <label for="bio">Bio</label>
            <textarea id="bio" v-model="user.bio" rows="3"></textarea>
          </div>

          <h3>Preferences</h3>
          <div class="form-group checkbox-group">
            <label>
              <input type="checkbox" v-model="user.preferences.newsletter" />
              Receive newsletter updates
            </label>
          </div>

          <div class="form-group checkbox-group">
            <label>
              <input type="checkbox" v-model="user.preferences.notifications" />
              Email notifications when someone comments on my posts
            </label>
          </div>

          <button type="submit" class="save-btn">Save Changes</button>
        </form>
      </div>

      <div class="recent-activity">
        <h3>Recent Activity</h3>
        <div class="activity-list">
          <div v-if="recentActivity.length === 0" class="no-activity">
            <p>No recent activity to display.</p>
          </div>
          <div v-for="(activity, index) in recentActivity" :key="index" class="activity-item">
            <div class="activity-icon" :class="activity.type"></div>
            <div class="activity-details">
              <p class="activity-text">{{ activity.text }}</p>
              <p class="activity-date">{{ activity.date }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { blogPosts } from '../data/blogPosts.js'

export default {
  name: 'ProfileView',
  data() {
    return {
      user: {
        name: 'John Doe',
        email: 'john.doe@example.com',
        bio: 'Passionate blogger, traveler and tech enthusiast. I love sharing my experiences and learning from others.',
        preferences: {
          newsletter: true,
          notifications: false
        }
      }
    };
  },
  computed: {
    userInitials() {
      return this.user.name
        .split(' ')
        .map(name => name[0])
        .join('')
        .toUpperCase();
    },
    postsCount() {
      // For demo purposes, just returning a count of available posts
      // In a real app, this would be filtered by the user's posts
      return 12;
    },
    likedPosts() {
      try {
        const storedLikes = localStorage.getItem('likedPosts');
        return storedLikes ? JSON.parse(storedLikes) : [];
      } catch (e) {
        console.error('Could not parse liked posts', e);
        return [];
      }
    },
    likesCount() {
      return this.likedPosts.length;
    },
    commentsCount() {
      // In a real app, this would be actual user comments count
      return 36;
    },
    recentActivity() {
      const activity = [];

      // Add liked posts to activity
      this.likedPosts.forEach(postId => {
        const post = blogPosts.find(p => p.id === postId);
        if (post) {
          activity.push({
            type: 'like',
            text: `You liked "${post.title}"`,
            date: 'Recently', // In a real app, we would store the actual timestamp
            timestamp: Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000 // Random time within last week for sorting
          });
        }
      });

      // Add some default activities if needed
      if (activity.length < 4) {
        activity.push(
          {
            type: 'comment',
            text: 'You commented on "Weekend in Venice"',
            date: 'Last week',
            timestamp: Date.now() - 7 * 24 * 60 * 60 * 1000
          },
          {
            type: 'read',
            text: 'You read "Hiking the Appalachian Trail"',
            date: 'Last month',
            timestamp: Date.now() - 30 * 24 * 60 * 60 * 1000
          }
        );
      }

      // Sort by most recent first
      return activity.sort((a, b) => b.timestamp - a.timestamp).slice(0, 5);
    }
  },
  methods: {
    saveProfile() {
      // In a real app, this would save to backend
      alert('Profile saved successfully!');
    }
  }
}
</script>

<style scoped>
.profile-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.profile-container {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  overflow: hidden;
}

.profile-header {
  display: flex;
  padding: 30px;
  background-color: #f8f8f8;
  border-bottom: 1px solid #eee;
}

.profile-avatar {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 30px;
}

.avatar-placeholder {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background-color: #1e90ff;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  font-weight: bold;
  margin-bottom: 10px;
}

.change-avatar-btn {
  background: none;
  border: none;
  color: #1e90ff;
  cursor: pointer;
  font-size: 14px;
}

.profile-info {
  flex: 1;
}

.profile-info h2 {
  margin-top: 0;
  margin-bottom: 10px;
}

.profile-bio {
  color: #666;
  margin-bottom: 20px;
  line-height: 1.5;
}

.profile-stats {
  display: flex;
  gap: 20px;
  color: #555;
}

.profile-details {
  padding: 30px;
  border-bottom: 1px solid #eee;
}

.profile-form .form-group {
  margin-bottom: 20px;
}

.profile-form label {
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
}

.profile-form input[type="text"],
.profile-form input[type="email"],
.profile-form textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

.checkbox-group {
  display: flex;
  align-items: center;
}

.checkbox-group label {
  display: flex;
  align-items: center;
  font-weight: normal;
}

.checkbox-group input {
  margin-right: 10px;
}

.save-btn {
  background-color: #1e90ff;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 20px;
}

.save-btn:hover {
  background-color: #187bcd;
}

.recent-activity {
  padding: 30px;
}

.activity-list {
  margin-top: 15px;
}

.activity-item {
  display: flex;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
}

.activity-item:last-child {
  border-bottom: none;
}

.activity-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #f1f1f1;
  margin-right: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.activity-icon.like::before {
  content: '❤️';
}

.activity-icon.comment::before {
  content: '💬';
}

.activity-icon.read::before {
  content: '📖';
}

.activity-details {
  flex: 1;
}

.activity-text {
  margin: 0 0 5px 0;
}

.activity-date {
  margin: 0;
  color: #999;
  font-size: 14px;
}

.no-activity {
  text-align: center;
  color: #999;
  font-style: italic;
  padding: 20px 0;
}

@media (max-width: 768px) {
  .profile-header {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .profile-avatar {
    margin-right: 0;
    margin-bottom: 20px;
  }

  .profile-stats {
    justify-content: center;
  }
}
</style>
