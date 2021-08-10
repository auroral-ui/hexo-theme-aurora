const crypto = require('crypto')
const { tocObj, escapeHTML, encodeURL } = require('hexo-util')
const chalk = require('chalk')

exports.md5 = function (str, len = 20) {
  return crypto.createHash('md5').update(str).digest('hex').substring(0, len)
}

exports.base64 = function (str) {
  return Buffer.from(str).toString('base64').replace(/=/g, '')
}

exports.getToc = function (str, options = {}) {
  options = Object.assign(
    {
      min_depth: 1,
      max_depth: 6,
      class: 'toc',
      list_number: false
    },
    options
  )

  const data = tocObj(str, {
    min_depth: options.min_depth,
    max_depth: options.max_depth
  })

  if (!data.length) return ''

  const className = escapeHTML(options.class)
  const listNumber = options.list_number

  let result = `<ol class="${className}">`

  const lastNumber = [0, 0, 0, 0, 0, 0]
  let firstLevel = 0
  let lastLevel = 0

  for (let i = 0, len = data.length; i < len; i++) {
    const el = data[i]
    const { level, id, text } = el
    const href = id ? `#${encodeURL(id)}` : null

    lastNumber[level - 1]++

    for (let i = level; i <= 5; i++) {
      lastNumber[i] = 0
    }

    if (firstLevel) {
      for (let i = level; i < lastLevel; i++) {
        result += '</li></ol>'
      }

      if (level > lastLevel) {
        result += `<ol class="${className}-child">`
      } else {
        result += '</li>'
      }
    } else {
      firstLevel = level
    }

    result += `<li class="${className}-item ${className}-level-${level}">`
    if (href) {
      result += `<a class="${className}-link" href="${href}">`
    } else {
      result += `<a class="${className}-link">`
    }

    if (listNumber) {
      result += `<span class="${className}-number">`

      for (let i = firstLevel - 1; i < level; i++) {
        result += `${lastNumber[i]}.`
      }

      result += '</span> '
    }

    result += `<span class="${className}-text">${text}</span></a>`

    lastLevel = level
  }

  for (let i = firstLevel - 1; i < lastLevel; i++) {
    result += '</li></ol>'
  }

  return result
}

exports.filterHTMLCharacters = function (str) {
  // Removing all html tags
  // Removing all line breakers.
  return String(str)
    .replace(/(&nbsp;|<([^>]+)>)/gi, '')
    .replace('/\n/gm', ' ')
}

exports.generateUid = function (str) {
  return crypto.createHash('md5').update(str).digest('hex')
}

exports.fetchCovers = function (str, size = 0) {
  let temp,
    imgURLs = [],
    rex = /<img[^>]+src="?([^"\s]+)"(.*)>/g
  while ((temp = rex.exec(str))) {
    imgURLs.push(temp[1])
  }

  if ((size = 0)) return imgURLs ? imgURLs[0] : null
  return imgURLs.length > 0 ? imgURLs.slice(0, size) : null
}

exports.isEmptyObject = function (value) {
  if (!exports.isObject(value)) return false

  for (const key in value) return false
  return true
}

exports.formatNumber = function (value) {
  if (value > 9999) {
    value = Math.round(value / 1000) + 'k' // > 9999 => 11k
  } else if (value > 999) {
    value = Math.round(value / 100) / 10 + 'k' // > 999 => 1.1k
  } // < 999 => 111
  return value
}

exports.throwError = function (type, msg) {
  console.error(`${chalk.red(`[${type}]`)} ${chalk.yellow(msg)}`)
  console.error(
    `${chalk.red('[NOTE]')} ${chalk.yellow(
      'Please create an issue @ https://github.com/auroral-ui/hexo-theme-aurora/issues with the above error message. Thanks!'
    )}`
  )
}

exports.throwInfo = function (type, msg) {
  console.error(`${chalk.blue(`[${type}]`)} ${chalk.yellow(msg)}`)
}
