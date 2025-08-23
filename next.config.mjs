import nextPwa from 'next-pwa'

const isDev = process.env.NODE_ENV === 'development'

const withPwa = nextPwa({
  dest: 'public',
  disable: isDev, // disable PWA in development
  register: true,
  skipWaiting: true,
})

const nextConfig = {}

export default withPwa(nextConfig)
