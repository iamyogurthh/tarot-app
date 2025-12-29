export const imageToBase64 = async (src) => {
  const res = await fetch(src)
  const blob = await res.blob()

  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.onloadend = () => resolve(reader.result)
    reader.readAsDataURL(blob)
  })
}
