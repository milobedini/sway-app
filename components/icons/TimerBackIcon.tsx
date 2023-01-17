import Svg, { Path, SvgProps } from "react-native-svg";

export const TimerBackIcon = ({ fill, ...rest }: SvgProps) => (
  <Svg viewBox="0 0 20 20" fill={fill} {...rest} width={50} height={50}>
    <Path
      d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L9.414 11H13a1 1 0 100-2H9.414l1.293-1.293z"
      fillRule="evenodd"
      clipRule="evenodd"
    />
  </Svg>
);
