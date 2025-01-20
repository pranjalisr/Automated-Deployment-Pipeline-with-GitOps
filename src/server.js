const express = require("express")
const app = express()
const port = process.env.PORT || 3000

// Middleware for request logging
app.use((req, res, next) => {
  console.log(`📝 ${new Date().toISOString()} - ${req.method} request to ${req.url}`)
  next()
})

// Home route
app.get("/", (req, res) => {
  res.send(`
    <h1>Welcome to CoolApp v${process.env.APP_VERSION || "1.0"}</h1>
    <p>The most awesome app you'll ever use! 🚀</p>
  `)
})

// Health check endpoint
app.get("/health", (req, res) => {
  // TODO: Add actual health checks (DB connection, cache, etc.)
  res.status(200).json({
    status: "healthy",
    message: "I'm alive and kicking! 💪",
    timestamp: new Date().toISOString(),
  })
})

// Version endpoint
app.get("/version", (req, res) => {
  res.json({
    version: process.env.APP_VERSION || "1.0",
    environment: process.env.NODE_ENV || "development",
    lastUpdated: process.env.BUILD_DATE || "unknown",
  })
})

// Easter egg route (because why not?)
app.get("/secret", (req, res) => {
  res.status(418).send("I'm a teapot 🫖")
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(`💥 Oops! Something went wrong: ${err.stack}`)
  res.status(500).send("Something broke! But our devs are probably on it... or sleeping. 😴")
})

// Start the server
app.listen(port, () => {
  console.log(`🚀 CoolApp is blasting off on port ${port}`)
})

