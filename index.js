import { HTML } from './libs/afrontend/index.js'
import { TextComponent } from './components/text.component.js'
import { AudioMessageComponent } from './components/audio.message.component.js'
import { TwoColumnsComponent } from './components/two.columns.component.js'
import { ImageLinkComponent } from './components/image.link.component.js'
import { PageComponent } from './components/page.component.js'
import { SelectComponent } from './components/select.component.js'
import { ButtonComponent } from './components/button.component.js'
import { InputComponent } from './components/input.component.js'
import { ImageComponent } from './components/image.component.js'
import { LinkComponent } from './components/link.component.js'
import { AudioMessageModel } from './models/audio.message.model.js'
import { MessageModel } from './models/message.model.js'
import { getLanguages } from './languages.js'

export class Page extends PageComponent {
  ip = new HTML()
  src_input = new InputComponent({ label: 'src', value: 'project ' + Date.now().toString() })
  key_input = new InputComponent({ label: 'key', value: 'ebcb13f044794a24b8f1511008312127', type: 'password' })
  language_select = new SelectComponent({ label: 'languages' })
  messages = new HTML()

  onCreate() {
    super.onCreate()
    this.append(this.getHeader())
    this.append(this.getBody())
  }

  getHeader() {
    return new TwoColumnsComponent({
      html1: new ImageLinkComponent({ src: './logo.png', href: 'https://voicerss.org/' }),
      html2: new HTML(),
    })
  }

  getBody() {
    return new TwoColumnsComponent({ html1: this.getForm(), html2: this.getMessages() })
  }

  getForm() {
    const form = new HTML()
    form.append(this.getSrcInput())
    form.append(this.getKeyInput())
    form.append(this.getLanguageSelect())
    form.append(new ButtonComponent({ text: 'send', onclick: () => this.onSendButtonClick() }))
    return form
  }

  getSrcInput() {
    return this.src_input
  }

  getKeyInput() {
    return this.key_input
  }

  getLanguageSelect() {
    Array.from(getLanguages()).map((l) => this.language_select.input.addOption(l, l))
    return this.language_select
  }

  onSendButtonClick() {
    this.addAudioMessage()
  }

  addAudioMessage() {
    const key = this.key_input.getValue()
    const src = this.src_input.getValue()
    const hl = this.language_select.getValue()
    const search = new URLSearchParams({ key, src, hl })
    const url = this.getUrl({ search })
    this.addMessage(new AudioMessageModel(url, src))
  }

  getUrl({ search } = {}) {
    return `http://api.voicerss.org/?${search.toString()}`
  }

  addMessage(message = new MessageModel()) {
    this.messages.append(this.parseMessage(message))
  }

  parseMessage(message = new MessageModel()) {
    if (message.type = 'audio') {
      return new AudioMessageComponent(message)
    }

    return new TextComponent({ text: message.type })
  }

  getMessages() {
    this.messages.setStyle('text-align', 'right')
    return this.messages
  }
}
