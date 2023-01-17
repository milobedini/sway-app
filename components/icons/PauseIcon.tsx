import Svg, { Path, SvgProps } from "react-native-svg";

export const PauseIcon = ({ fill, ...rest }: SvgProps) => (
  <Svg viewBox="0 0 20 20" fill={fill} height={80} width={80} {...rest}>
    <Path
      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z"
      clipRule="evenodd"
      fillRule="evenodd"
    />
  </Svg>
);
