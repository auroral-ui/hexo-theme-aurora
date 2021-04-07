import { filterHTMLContent } from '@/utils/index'

describe('Utils: filterHTMLContent', () => {
  it('replacing image', () => {
    expect(
      filterHTMLContent('hello ![image](https://abc.com/example.png) world')
    ).toBe('hello [img] world')
  })

  it('replacing link', () => {
    expect(filterHTMLContent('hello https://abc.com/img.png world')).toBe(
      'hello [link] world'
    )
  })

  it('replacing HTML tags', () => {
    expect(filterHTMLContent('hello <b>world</b>')).toBe('hello world')
  })

  it('replacing link, image, tag', () => {
    expect(
      filterHTMLContent(
        'hello ![image](https://abc.com/example.png) <b>world</b> https://abc.com/img.png'
      )
    ).toBe('hello [img] world [link]')
  })

  it('substr content over 28 characters', () => {
    expect(filterHTMLContent('123456789012345678901234567890')).toBe(
      '1234567890123456789012345678...'
    )
  })

  it('custom substr length', () => {
    expect(filterHTMLContent('123456789012345678901234567890', 10)).toBe(
      '1234567890...'
    )
  })
})
