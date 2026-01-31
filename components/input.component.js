import { HTML, nLabel, nInput } from '../libs/afrontend/index.js'

export class InputComponent extends HTML {
  state = {
    label: '',
    value: [],
    type: 'text',
  }

  label = new nLabel()
  input = new nInput()

  constructor({ label, value = [], type = 'text' } = {}) {
    super()
    this.state.label = label
    this.state.value = value
    this.state.type = type
  }

  onCreate() {
    super.onCreate()
    this.append(this.getLabel())
    this.append(this.getInput())
  }

  getLabel() {
    this.label.setText(this.state.label)
    this.label.setStyle('padding', 'calc(1rem / 4)')
    return this.label
  }

  getInput() {
    this.input.setAttr('type', this.state.type)
    this.input.setValue(this.state.value)
    return this.input
  }

  getValue() {
    return this.input.getValue()
  }
}
