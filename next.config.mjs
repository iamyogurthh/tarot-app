import nextPwa from 'next-pwa'

const withPwa = nextPwa({
  dest: 'public',
  register: true,
  skipWaiting: true,
})

const nextConfig = {
  // Your existing config options here
}

export default withPwa(nextConfig)
