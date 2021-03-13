export class Statistic {
  categories = 0
  posts = 0
  tags = 0
  wordCount = 0

  constructor(raw?: { [key: string]: number }) {
    if (raw) {
      for (const key of Object.keys(this)) {
        if (Object.prototype.hasOwnProperty.call(raw, key)) {
          Object.assign(this, { [key]: raw[key] })
        }
      }
    }
  }
}
