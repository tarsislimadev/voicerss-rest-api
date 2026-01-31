import { MessageComponent } from './message.component.js'
import { TextComponent } from './text.component.js'
import { nAudio } from './audio.js'

export class AudioMessageComponent extends MessageComponent {
  onCreate() {
    super.onCreate()
    this.append(this.getTextComponent())
    this.append(this.getAudioComponent())
    this.append(this.getLanguageComponent())
  }

  getTextComponent() {
    return new TextComponent({ text: this.message.text })
  }

  getAudioComponent() {
    return new nAudio({ src: this.message.url })
  }

  getLanguageComponent() {
    return new TextComponent({ text: this.message.language })
  }
}
