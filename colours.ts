export class Colours {
  static readonly dark = new Colours('0c1527')
  static readonly white = new Colours('eef6ff')
  static readonly darkGrey = new Colours('a6adbb')
  static readonly bright = new Colours('18cdba')
  static readonly lightGrey = new Colours('e0e9f3')

  static readonly black = new Colours('000000')

  static readonly errorDark = new Colours('F14040')

  private constructor(
    private readonly rgb: string,
    private readonly opacity: number = 1
  ) {}

  private opacityAsHex(): string {
    return Math.ceil(this.opacity * 255)
      .toString(16)
      .padStart(2, '0')
  }

  o(o: number): Colours {
    return new Colours(this.rgb, o)
  }

  get $() {
    return `#${this.rgb}${this.opacityAsHex()}`
  }
}
