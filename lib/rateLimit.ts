/**
 * Simple rate limiting utility using in-memory store
 * Tracks requests by IP address
 */

interface RateLimitStore {
  [key: string]: {
    count: number
    resetTime: number
  }
}

const store: RateLimitStore = {}

/**
 * Rate limiter for API endpoints
 * @param ip - Client IP address
 * @param limit - Maximum requests allowed per window
 * @param windowMs - Time window in milliseconds
 * @returns true if request is allowed, false if rate limit exceeded
 */
export function rateLimit(ip: string, limit: number = 5, windowMs: number = 60000): boolean {
  const now = Date.now()
  const key = ip

  if (!store[key]) {
    store[key] = {
      count: 1,
      resetTime: now + windowMs,
    }
    return true
  }

  // Reset if window has passed
  if (now > store[key].resetTime) {
    store[key] = {
      count: 1,
      resetTime: now + windowMs,
    }
    return true
  }

  // Check if limit exceeded
  if (store[key].count >= limit) {
    return false
  }

  store[key].count++
  return true
}

/**
 * Get client IP from request headers
 */
export function getClientIP(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for')
  const ip = forwarded ? forwarded.split(',')[0].trim() : request.headers.get('x-real-ip') || 'unknown'
  return ip
}
