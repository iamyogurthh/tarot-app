import path from 'path'
import { writeFile } from 'fs/promises'
import fs from 'fs/promises'

export function getDataFromForm(formData, ...args) {
  let data = {}
  for (let i = 0; i < args.length; i++) {
    data[args[i]] = formData.get(args[i])
  }
  return data
}

export async function handleImage(img) {
  const buffer = Buffer.from(await img.arrayBuffer())
  const filename = Date.now() + img.name.replaceAll(' ', '_')
  await writeFile(
    path.join(process.cwd(), `/public/tarot_images/` + filename),
    buffer
  )
  return filename
}

export async function deleteImage(filename) {
  if (!filename) return
  const filepath = path.join(process.cwd(), `/public/tarot_images/${filename}`)
  try {
    await fs.unlink(filepath)
    console.log('File deleted successfully:', filename)
  } catch (error) {
    if (error.code !== 'ENOENT') {
      console.error('Error deleting file:', error)
    } else {
      console.warn('File not found, nothing to delete:', filename)
    }
  }
}

export async function handleImageEdit(img, object) {
  if (typeof img === 'string') {
    img = img
  } else if (img && img.name !== '') {
    await deleteImage(object.image)
    img = await handleImage(img)
  }
  return img
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
