export function displayTags (tags) {
  let stringTemplate = ''
  tags.forEach(tag => {
    stringTemplate += `<a><span class="tag" tabindex="0">#${tag}</span></a>`
  })
  return stringTemplate
}
