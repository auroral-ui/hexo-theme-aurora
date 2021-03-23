const truncate = require('truncate-html')

module.exports = truncateHTML

truncate.setup({
  stripTags: true,
  length: 140,
  byWord: true,
  exclude: ['img', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6']
})

function truncateHTML(str) {
  return truncate(str)
}
