<template>
  <div class="pricing">
    <h1>Pricing Plans</h1>
    <p>Choose the plan that best fits your needs.</p>

    <div class="pricing-cards">
      <div class="pricing-card">
        <div class="card-header">
          <h2>Free</h2>
          <p class="price">$0<span>/month</span></p>
        </div>
        <div class="card-body">
          <ul>
            <li>5 blog posts per month</li>
            <li>Basic analytics</li>
            <li>Community support</li>
            <li>No ads</li>
          </ul>
          <button class="plan-btn">Get Started</button>
        </div>
      </div>

      <div class="pricing-card featured">
        <div class="card-header">
          <h2>Premium</h2>
          <p class="price">$9<span>/month</span></p>
        </div>
        <div class="card-body">
          <ul>
            <li>Unlimited blog posts</li>
            <li>Advanced analytics</li>
            <li>Priority support</li>
            <li>Custom domain</li>
            <li>No ads</li>
          </ul>
          <button class="plan-btn">Sign Up Now</button>
        </div>
      </div>

      <div class="pricing-card">
        <div class="card-header">
          <h2>Pro</h2>
          <p class="price">$19<span>/month</span></p>
        </div>
        <div class="card-body">
          <ul>
            <li>Everything in Premium</li>
            <li>Multiple authors</li>
            <li>API access</li>
            <li>24/7 support</li>
            <li>Enhanced security</li>
          </ul>
          <button class="plan-btn">Contact Sales</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pricing {
  padding: 20px;
  max-width: 1000px;
  margin: 0 auto;
}

h1 {
  margin-bottom: 20px;
  text-align: center;
}

.pricing-cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 30px;
  margin-top: 40px;
}

.pricing-card {
  flex: 1;
  min-width: 250px;
  max-width: 300px;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;
}

.pricing-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.1);
}

.pricing-card.featured {
  border: 2px solid #1e90ff;
  transform: scale(1.05);
}

.card-header {
  background-color: #f8f8f8;
  padding: 20px;
  text-align: center;
  border-bottom: 1px solid #ddd;
}

.featured .card-header {
  background-color: #1e90ff;
  color: white;
}

.price {
  font-size: 36px;
  font-weight: bold;
  margin: 10px 0;
}

.price span {
  font-size: 16px;
  font-weight: normal;
}

.card-body {
  padding: 20px;
}

ul {
  list-style-type: none;
  padding: 0;
  margin: 0 0 20px 0;
}

li {
  padding: 8px 0;
  border-bottom: 1px solid #eee;
}

li:last-child {
  border-bottom: none;
}

.plan-btn {
  width: 100%;
  padding: 10px;
  background-color: #1e90ff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
}

.plan-btn:hover {
  background-color: #187bcd;
}

@media (max-width: 768px) {
  .pricing-cards {
    flex-direction: column;
    align-items: center;
  }

  .pricing-card {
    width: 100%;
    max-width: 350px;
  }

  .pricing-card.featured {
    transform: none;
    order: -1;
  }
}
</style>
