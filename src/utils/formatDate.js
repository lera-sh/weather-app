export default function formatDate(dateString, lang) {
  const date = new Date(dateString)
  const options = { day: 'numeric', month: 'long' }
  const language = lang === 'en' ? 'en-gb' : lang
  return date.toLocaleString(language, options)
}
