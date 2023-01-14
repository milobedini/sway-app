import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg";

export const MoreInfoIcon = ({ fill, ...rest }: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...rest}>
    <G clipPath="url(#a)">
      <Path
        d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2Zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2Zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2Z"
        fill={fill}
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h24v24H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
