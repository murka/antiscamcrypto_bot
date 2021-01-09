module.exports = {
  apps: [{
    name: 'AntiScamCryptoBot',
    script: './index.js',
    env_production: {
      NODE_ENV: "production",
      TOKEN: 'TOKEN',
      trigger: 0.5, // between 0 and 1
      vocabulary: ['blockchain', 'bitcoin', 'giveaway','BTC', 'ETH', 'musk', 'elon']
    }
  }]
}