import { MessageModel } from './message.model.js'

export class AudioMessageModel extends MessageModel {
  type = 'audio'
  url = ''
  language = ''

  constructor({ url, text = '', language = '' } = {}) {
    super({ text })
    this.url = url
    this.language = language
  }

  toJSON() {
    const { url, type, language, text } = this
    return { url, type, language, text }
  }

}
