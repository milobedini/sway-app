import Svg, { Path, SvgProps } from "react-native-svg";

export const HomeIcon = ({ fill, ...rest }: SvgProps) => (
  <Svg width={24} height={24} viewBox="0 0 20 17" fill="none" {...rest}>
    <Path
      d="M10 2.69l5 4.5V15h-2V9H7v6H5V7.19l5-4.5zM10 0L0 9h3v8h6v-6h2v6h6V9h3L10 0z"
      fill={fill}
    />
  </Svg>
);
