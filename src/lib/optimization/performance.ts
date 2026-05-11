/**
 * Performance monitoring and Web Vitals tracking
 */

export interface WebVitals {
  name: string;
  value: number;
  rating: "good" | "fair" | "poor";
  delta?: number;
  id?: string;
}

export interface PerformanceMetrics {
  CLS: number;
  FID: number;
  LCP: number;
  TTFB: number;
  INP: number;
}

export const webVitalsThresholds = {
  CLS: { good: 0.1, fair: 0.25 },
  FID: { good: 100, fair: 300 },
  LCP: { good: 2500, fair: 4000 },
  TTFB: { good: 600, fair: 1200 },
  INP: { good: 200, fair: 500 },
};

export function getWebVitalRating(
  metric: string,
  value: number,
): "good" | "fair" | "poor" {
  const thresholds = webVitalsThresholds[metric as keyof typeof webVitalsThresholds];
  if (!thresholds) return "poor";
  if (value <= thresholds.good) return "good";
  if (value <= thresholds.fair) return "fair";
  return "poor";
}

export const performanceTargets = {
  lighthouse: {
    seo: 95,
    performance: 90,
    accessibility: 90,
    bestPractices: 85,
    pwa: 80,
  },
  core_web_vitals: {
    LCP: 2500,
    FID: 100,
    CLS: 0.1,
    INP: 200,
    TTFB: 600,
  },
  bundle_size: {
    js: 200,
    css: 50,
    total: 300,
  },
};

export function reportPerformanceMetric(metric: WebVitals): void {
  if (typeof window === "undefined") return;

  const data = {
    metric: metric.name,
    value: metric.value,
    rating: metric.rating,
    timestamp: new Date().toISOString(),
  };

  if (navigator.sendBeacon) {
    const url = "/api/analytics/performance";
    navigator.sendBeacon(url, JSON.stringify(data));
  } else if (typeof fetch !== "undefined") {
    fetch("/api/analytics/performance", {
      method: "POST",
      body: JSON.stringify(data),
      keepalive: true,
    }).catch(() => {});
  }
}

export function setupPerformanceMonitoring(): void {
  if (typeof window === "undefined") return;

  try {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const data = entry.toJSON();
        console.log("Performance entry:", data);
      }
    });

    observer.observe({
      entryTypes: ["paint", "navigation", "resource", "measure", "mark"],
      buffered: true,
    });
  } catch (error) {
    console.error("Performance monitoring setup failed:", error);
  }
}

export function measureRoute(routeName: string): () => void {
  const startMark = `route-start-${routeName}`;
  const endMark = `route-end-${routeName}`;
  const measure = `route-${routeName}`;

  performance.mark(startMark);

  return () => {
    performance.mark(endMark);
    performance.measure(measure, startMark, endMark);
    const duration = performance.getEntriesByName(measure)[0] as PerformanceMeasure;
    console.log(`Route ${routeName} took ${duration.duration}ms`);
  };
}
