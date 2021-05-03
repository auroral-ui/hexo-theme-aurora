const QUOTE_REGEX = /<p>:{3}([a-zA-Z0-9]+)\s?([\s\S]*?)(?:<\/p>\n|<br>)([\s\S]*?)(?:<p>|<br>):{3}<\/p>/gm
const QUOTE_TYPES = ['tip', 'warning', 'danger', 'details']
const TAG_REGEX = /^<\/?([ul|ol|p]+)>/g
const BLOCKQUOTE_REGEX = /<blockquote>\n([\s\S]*?)\n<\/blockquote>/gm
const QUOTE_LANG = {
  en: {
    tip: 'TIP',
    warning: 'WARNING',
    danger: 'WARNING',
    details: 'Details'
  },
  cn: {
    tip: '提示',
    warning: '注意',
    danger: '特别注意',
    details: '隐藏内容'
  }
}
const SVG = {
  tip: `<svg width="24" height="24" viewBox="0 0 24 24" fill="" xmlns="http://www.w3.org/2000/svg" data-reactroot="">
<path fill="" d="M20.86 14.13C20 14.7 19.56 15.74 19.77 16.76C20.13 18.55 18.55 20.13 16.76 19.77C15.74 19.57 14.7 20 14.13 20.86C13.12 22.38 10.89 22.38 9.88 20.86C9.3 20 8.26 19.56 7.24 19.77C5.45 20.13 3.87 18.55 4.23 16.76C4.43 15.74 4 14.7 3.14 14.13C1.62 13.12 1.62 10.89 3.14 9.88C4 9.3 4.44 8.26 4.23 7.24C3.87 5.45 5.45 3.87 7.24 4.23C8.26 4.44 9.3 4 9.87 3.14C10.88 1.62 13.11 1.62 14.12 3.14C14.7 4 15.74 4.44 16.76 4.23C18.55 3.87 20.13 5.45 19.77 7.24C19.56 8.26 20 9.3 20.86 9.87C22.38 10.88 22.38 13.12 20.86 14.13Z" undefined="1"></path>
<path stroke-linejoin="round" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2" stroke="" d="M12.01 15C12.01 14.5 12.01 14.5 12.01 14.5C12.04 13.75 13 13.46 14.04 12.2C14.41 11.74 14.69 11.41 14.86 10.85C15.15 9.95 14.92 9.18 14.86 9.02C14.8 8.79 14.52 8 13.72 7.46C13.06 7.02 12.42 7 12.14 7C11.9 7 11.36 7 10.78 7.3C10.28 7.56 9.98 7.9 9.83 8.1C9.24 8.82 9.06 9.63 9 10.06"></path>
<path stroke-linecap="round" stroke-miterlimit="10" stroke-width="2" stroke="" d="M11.99 18H12.01"></path>
</svg>`,
  warning: `<svg width="24" height="24" viewBox="0 0 24 24" fill="" xmlns="http://www.w3.org/2000/svg" data-reactroot="">
<path fill="" d="M20.86 14.13C20 14.7 19.56 15.74 19.77 16.76C20.13 18.55 18.55 20.13 16.76 19.77C15.74 19.57 14.7 20 14.13 20.86C13.12 22.38 10.89 22.38 9.88 20.86C9.3 20 8.26 19.56 7.24 19.77C5.45 20.13 3.87 18.55 4.23 16.76C4.43 15.74 4 14.7 3.14 14.13C1.62 13.12 1.62 10.89 3.14 9.88C4 9.3 4.44 8.26 4.23 7.24C3.87 5.45 5.45 3.87 7.24 4.23C8.26 4.44 9.3 4 9.87 3.14C10.88 1.62 13.11 1.62 14.12 3.14C14.7 4 15.74 4.44 16.76 4.23C18.55 3.87 20.13 5.45 19.77 7.24C19.56 8.26 20 9.3 20.86 9.87C22.38 10.88 22.38 13.12 20.86 14.13Z" undefined="1"></path>
<path stroke-linejoin="round" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2" stroke="" d="M12 8V13"></path>
<path stroke-linejoin="round" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2" stroke="" d="M12 15.99V16.01"></path>
</svg>
`,
  danger: `<svg width="24" height="24" viewBox="0 0 24 24" fill="" xmlns="http://www.w3.org/2000/svg" data-reactroot="">
<path fill="" d="M19.76 5.23C15.84 5.23 12 2 12 2C12 2 8.15996 5.23 4.23996 5.23C4.23996 5.23 1.86996 16.99 12 22C22.13 16.99 19.76 5.23 19.76 5.23Z" undefined="1"></path>
<path stroke-linejoin="round" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2" stroke="" d="M12 8V13"></path>
<path stroke-linejoin="round" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2" stroke="" d="M11.99 16H12"></path>
</svg>
`,
  blockquote: `<svg width="24" height="24" viewBox="0 0 24 24" fill="" xmlns="http://www.w3.org/2000/svg" data-reactroot="">
<path fill="" d="M22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22C13.8 22 15.5 21.5 17 20.6L22 22L20.7 17C21.5 15.5 22 13.8 22 12Z" undefined="1"></path>
<path fill="" d="M15.97 11.5H16.04C17.12 11.5 18 12.38 18 13.47V13.53C18 14.62 17.12 15.5 16.03 15.5H15.96C14.88 15.5 14 14.62 14 13.53V13.46C14 12.38 14.88 11.5 15.97 11.5Z" undefined="1"></path>
<path fill="" d="M7.97 11.5H8.04C9.12 11.5 10 12.38 10 13.47V13.53C10 14.62 9.12 15.5 8.03 15.5H7.97C6.88 15.5 6 14.62 6 13.53V13.46C6 12.38 6.88 11.5 7.97 11.5Z" undefined="1"></path>
<path stroke-linejoin="round" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2" stroke="" d="M17 8.5C15.23 8.97 14.07 10.84 14.01 13.27C14 13.33 14 13.4 14 13.47V13.5"></path>
<path stroke-linejoin="round" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2" stroke="" d="M9 8.5C7.23 8.97 6.07 10.84 6.01 13.27C6 13.33 6 13.4 6 13.47V13.5"></path>
<path stroke-linejoin="round" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2" stroke="" d="M15.97 11.5H16.04C17.12 11.5 18 12.38 18 13.47V13.53C18 14.62 17.12 15.5 16.03 15.5H15.96C14.88 15.5 14 14.62 14 13.53V13.46C14 12.38 14.88 11.5 15.97 11.5Z"></path>
<path stroke-linejoin="round" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2" stroke="" d="M7.97 11.5H8.04C9.12 11.5 10 12.38 10 13.47V13.53C10 14.62 9.12 15.5 8.03 15.5H7.97C6.88 15.5 6 14.62 6 13.53V13.46C6 12.38 6.88 11.5 7.97 11.5Z"></path>
</svg>
`
}

module.exports = function (hexo) {
  const themeConfig = Object.assign(
    hexo.theme.config || {},
    hexo.config.theme_config
  )

  const lang = themeConfig.site.language

  hexo.extend.filter.register('after_post_render', function (data) {
    /** Filter and render Custom Quote Blocks */
    data.content = data.content.replace(
      QUOTE_REGEX,
      (matchedQuote, p1, p2, p3) => {
        let context,
          template = matchedQuote
        if (p1 && QUOTE_TYPES.indexOf(p1) !== -1) {
          context = {
            type: p1,
            title: p2 ? p2 : QUOTE_LANG[lang][p1],
            content: TAG_REGEX.test(p3) ? p3 : `<p>${p3}</p>`
          }

          if (context.type === 'details') {
            template = `<details class="custom-details">\n<summary>${context.title}</summary>\n${context.content}\n</details>`
          } else {
            template = `<div class="custom-quote ${
              context.type
            }">\n<span class="custom-quote-svg">${
              SVG[context.type]
            }</span>\n<p class="custom-quote-title">${context.title}</p>\n${
              context.content
            }\n</div>`
          }
        }
        return template
      }
    )
    /** Filter and render BlockQuote */
    data.content = data.content.replace(
      BLOCKQUOTE_REGEX,
      `<blockquote><span class="custom-blockquote-svg">${SVG['blockquote']}</span>$1</blockquote>`
    )
    return data
  })
}
