export function getDataFromForm(formData, ...args) {
  let data = {}
  for (let i = 0; i < args.length; i++) {
    data[args[i]] = formData.get(args[i])
  }
  return data
}

export function getZodiacSign(dateString) {
  const date = new Date(dateString) // e.g., "2000-05-15"
  const day = date.getDate()
  const month = date.getMonth() + 1 // getMonth() returns 0-11

  if ((month == 3 && day >= 21) || (month == 4 && day <= 19)) return 'Aries'
  if ((month == 4 && day >= 20) || (month == 5 && day <= 20)) return 'Taurus'
  if ((month == 5 && day >= 21) || (month == 6 && day <= 20)) return 'Gemini'
  if ((month == 6 && day >= 21) || (month == 7 && day <= 22)) return 'Cancer'
  if ((month == 7 && day >= 23) || (month == 8 && day <= 22)) return 'Leo'
  if ((month == 8 && day >= 23) || (month == 9 && day <= 22)) return 'Virgo'
  if ((month == 9 && day >= 23) || (month == 10 && day <= 22)) return 'Libra'
  if ((month == 10 && day >= 23) || (month == 11 && day <= 21)) return 'Scorpio'
  if ((month == 11 && day >= 22) || (month == 12 && day <= 21))
    return 'Sagittarius'
  if ((month == 12 && day >= 22) || (month == 1 && day <= 19))
    return 'Capricorn'
  if ((month == 1 && day >= 20) || (month == 2 && day <= 18)) return 'Aquarius'
  if ((month == 2 && day >= 19) || (month == 3 && day <= 20)) return 'Pisces'
}

export function getNumerology(dob) {
  // dob format: "YYYY-MM-DD"
  let digits = dob.replace(/-/g, '') // remove dashes
  let sum = digits.split('').reduce((acc, val) => acc + parseInt(val), 0)

  // Reduce to single digit
  while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
    sum = sum
      .toString()
      .split('')
      .reduce((acc, val) => acc + parseInt(val), 0)
  }

  return sum
}

export function formatDateTime(isoString) {
  const date = new Date(isoString)
  return date.toLocaleString('en-US', {
    timeZone: 'UTC',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export const formatBirthDate = (isoString) => {
  if (!isoString) return ''

  const date = new Date(isoString)
  return date.toLocaleDateString('en-GB', {
    timeZone: 'UTC',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}
