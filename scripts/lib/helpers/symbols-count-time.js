const { filterHTMLCharacters } = require('../helpers/utils')

module.exports = symbolsCountTime

function symbolsCountTime(content, isSite) {
  var getSymbols = function (post) {
    return filterHTMLCharacters(post).length
  }

  var getFormatTime = function (minutes, suffix) {
    var fHours = Math.floor(minutes / 60)
    var fMinutes = Math.floor(minutes - fHours * 60)
    if (fMinutes < 1) {
      fMinutes = 1
    } // 0 => 1
    if (!suffix) {
      suffix = 'mins.'
    } // 1 => 1 mins.
    return fHours < 1
      ? fMinutes + ' ' + suffix // < 59 => 59 mins.
      : fHours + ':' + ('00' + fMinutes).slice(-2) // = 61 => 1:01
  }

  var getSymbolsCount = function (post) {
    var symbolsResult = getSymbols(post)
    if (symbolsResult > 9999) {
      symbolsResult = Math.round(symbolsResult / 1000) + 'k' // > 9999 => 11k
    } else if (symbolsResult > 999) {
      symbolsResult = Math.round(symbolsResult / 100) / 10 + 'k' // > 999 => 1.1k
    } // < 999 => 111
    return symbolsResult
  }

  var getSymbolsTime = function (post, awl, wpm, suffix) {
    if (!awl) {
      awl = '4'
    }
    if (!wpm) {
      wpm = '275'
    }
    var minutes = Math.round(getSymbols(post) / (awl * wpm))
    return getFormatTime(minutes, suffix)
  }

  var getSymbolsTotal = function (posts) {
    var symbolsResultCount = 0
    posts.forEach(function (post) {
      if (String(post.count_time.symbolsCount).indexOf('k') > -1) {
        post.count_time.symbolsCount =
          Number(String(post.count_time.symbolsCount).replace(/[k]+/g, '')) *
          1000
      }
      symbolsResultCount += Number(post.count_time.symbolsCount)
    })
    if (symbolsResultCount > 9999) {
      symbolsResultCount = Math.round(symbolsResultCount / 1000) + 'k' // > 9999 => 11k
    } else if (symbolsResultCount > 999) {
      symbolsResultCount = Math.round(symbolsResultCount / 100) / 10 + 'k' // > 999 => 1.1k
    } // < 999 => 111
    return symbolsResultCount
  }

  if (!isSite) {
    return {
      symbolsCount: getSymbolsCount(content),
      symbolsTime: getSymbolsTime(content)
    }
  } else {
    return getSymbolsTotal(content)
  }
}
