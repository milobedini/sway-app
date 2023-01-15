export class Colours {
  static readonly dark = new Colours("0c1527");
  static readonly white = new Colours("eef6ff");
  static readonly darkGrey = new Colours("a6adbb");
  static readonly bright = new Colours("18cdba");
  static readonly lightGrey = new Colours("e0e9f3");
  static readonly black = new Colours("000000");
  static readonly errorDark = new Colours("F14040");

  static readonly brightWhite = new Colours("FFFFFF");
  static readonly brightGrey = new Colours("D3D3D3");
  static readonly brightBlack = new Colours("000000");
  static readonly brightRed = new Colours("FF0000");
  static readonly brightOrange = new Colours("FFA500");

  static readonly lightBlue = new Colours("5bc5d5");
  static readonly mediumBlue = new Colours("1a6a8d");
  static readonly darkBlue = new Colours("0c1527");
  static readonly lightPurple = new Colours("947dd8");
  static readonly mediumPurple = new Colours("6c4d9f");
  static readonly darkPurple = new Colours("4e2f7c");
  static readonly lightPink = new Colours("f8b1c1");
  static readonly mediumPink = new Colours("f27a9f");
  static readonly darkPink = new Colours("e84d6f");
  static readonly lightGreen = new Colours("a2e2a5");
  static readonly mediumGreen = new Colours("76c98f");
  static readonly darkGreen = new Colours("44916e");

  private constructor(
    private readonly rgb: string,
    private readonly opacity: number = 1
  ) {}

  private opacityAsHex(): string {
    return Math.ceil(this.opacity * 255)
      .toString(16)
      .padStart(2, "0");
  }

  o(o: number): Colours {
    return new Colours(this.rgb, o);
  }

  get $() {
    return `#${this.rgb}${this.opacityAsHex()}`;
  }
}
