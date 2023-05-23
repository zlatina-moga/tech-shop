const NEXT_PUBLIC_GOOGLE_ANALYTICS = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS

export const pageview = (url) => {
    window.gtag("config", NEXT_PUBLIC_GOOGLE_ANALYTICS, {
      page_path: url,
    })
  }
  
  // https://developers.google.com/analytics/devguides/collection/gtagjs/events
  export const event = ({ action, params }) => {
    window.gtag("event", action, params)
  }