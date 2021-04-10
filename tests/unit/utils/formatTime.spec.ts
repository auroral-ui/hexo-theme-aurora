import { formatTime } from '@/utils/index'

const stringDateTime = new Date(+new Date() - 1).toUTCString()

describe('Utils: formatTime', () => {
  it('String time', () => {
    expect(formatTime(String(stringDateTime))).toBe('just seconds ago')
  })

  it('10 digits timestamp', () => {
    expect(formatTime(((+new Date() - 1) / 1000).toFixed(0))).toBe(
      'just seconds ago'
    )
  })

  it('just now - en', () => {
    expect(formatTime(+new Date() - 1)).toBe('just seconds ago')
  })

  it('just now - cn', () => {
    expect(formatTime(+new Date() - 1, { lang: 'cn' })).toBe('刚刚')
  })

  it('two minutes ago - en', () => {
    expect(formatTime(+new Date() - 60 * 2 * 1000)).toBe('2 minutes ago')
  })

  it('two minutes ago - cn', () => {
    expect(formatTime(+new Date() - 60 * 2 * 1000, { lang: 'cn' })).toBe(
      '2分钟前'
    )
  })

  it('two hours ago - en', () => {
    expect(formatTime(+new Date() - 3600 * 2 * 1000)).toBe('2 hours ago')
  })

  it('two hours ago - cn', () => {
    expect(formatTime(+new Date() - 3600 * 2 * 1000, { lang: 'cn' })).toBe(
      '2小时前'
    )
  })

  it('two days ago - en', () => {
    expect(formatTime(+new Date() - 3600 * 24 * 2 * 1000)).toBe('2 days ago')
  })

  it('two days ago - cn', () => {
    expect(formatTime(+new Date() - 3600 * 24 * 2 * 1000, { lang: 'cn' })).toBe(
      '2天前'
    )
  })

  it('two months ago - en', () => {
    expect(formatTime(+new Date() - 3600 * 24 * 30 * 2 * 1000)).toBe(
      '2 months ago'
    )
  })

  it('two months ago - cn', () => {
    expect(
      formatTime(+new Date() - 3600 * 24 * 30 * 2 * 1000, { lang: 'cn' })
    ).toBe('2个月前')
  })

  it('two years ago - en', () => {
    expect(formatTime(+new Date() - 3600 * 24 * 365 * 2 * 1000)).toBe(
      '2 years ago'
    )
  })

  it('two years ago - cn', () => {
    expect(
      formatTime(+new Date() - 3600 * 24 * 365 * 2 * 1000, { lang: 'cn' })
    ).toBe('2年前')
  })

  it('using template', () => {
    expect(formatTime(+new Date() - 1, { template: 'Published [TIME]' })).toBe(
      'Published just seconds ago'
    )
  })
})
