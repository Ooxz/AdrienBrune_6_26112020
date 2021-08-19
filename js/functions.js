export function displayTags (tags) {
  let stringTemplate = ''
  tags.forEach(tag => {
    stringTemplate += `<span class="tag" tabindex="0" role="button">#${tag}</span>`
  })
  return stringTemplate
}
