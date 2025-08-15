// Simple in-memory rate limiter
// In production, use Redis or similar for distributed rate limiting

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

class RateLimiter {
  private limits = new Map<string, RateLimitEntry>();
  private readonly maxRequests: number;
  private readonly windowMs: number;

  constructor(maxRequests = 20, windowMs = 60000) {
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;
  }

  check(identifier: string): { success: boolean; remaining: number } {
    const now = Date.now();
    const entry = this.limits.get(identifier);

    // Clean up old entries periodically
    if (Math.random() < 0.01) {
      this.cleanup(now);
    }

    if (!entry || now > entry.resetTime) {
      // New window
      this.limits.set(identifier, {
        count: 1,
        resetTime: now + this.windowMs,
      });
      return { success: true, remaining: this.maxRequests - 1 };
    }

    if (entry.count >= this.maxRequests) {
      return { success: false, remaining: 0 };
    }

    // Increment count
    entry.count++;
    return { success: true, remaining: this.maxRequests - entry.count };
  }

  private cleanup(now: number) {
    for (const [key, entry] of this.limits.entries()) {
      if (now > entry.resetTime) {
        this.limits.delete(key);
      }
    }
  }
}

// Export singleton instance
export const rateLimit = new RateLimiter();
