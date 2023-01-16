import Svg, { Path, SvgProps } from "react-native-svg";
export const TimerIcon = ({ fill, ...rest }: SvgProps) => (
  <Svg width={24} height={24} viewBox="0 0 512.000000 512.000000" {...rest}>
    <Path
      d="M2488 5099c-23-12-46-35-58-59-19-37-20-58-20-472 0-392 2-436 18-468 53-107 211-107 264 0 16 31 18 71 18 373v337h40c62 0 234-28 349-56 163-40 293-89 456-169 459-226 811-580 1036-1040 264-542 299-1165 99-1740-79-226-240-505-408-705-296-354-732-624-1183-733-201-49-309-61-539-61-235 0-341 12-550 64-450 112-877 378-1172 730-741 885-711 2154 71 3002 103 112 118 161 72 246-29 53-129 79-189 48-35-18-162-150-241-251-287-362-467-789-532-1265-17-123-18-516-1-635 42-295 120-553 242-800 137-280 272-468 494-691 221-220 412-357 681-489 188-92 309-137 500-185 500-126 1002-102 1490 71 149 53 407 182 540 271 365 243 667 578 866 963 181 348 271 694 286 1090 15 426-73 832-263 1214-124 250-263 447-458 648-216 224-428 378-711 518-296 146-572 225-900 255-170 15-253 13-297-11z"
      transform="matrix(.1 0 0 -.1 0 512)"
      fill={fill}
    />
    <Path
      d="M1193 3970c-42-25-63-68-63-128 0-47 16-74 504-843 460-725 511-801 587-879 96-98 166-140 285-170 200-51 392-2 529 135s186 329 135 529c-29 115-73 189-165 281-73 73-150 125-879 588-787 500-799 507-850 507-33 0-62-7-83-20zm1092-946c259-164 487-314 507-332 76-69 118-216 88-307-17-53-83-121-136-141-94-36-243 3-316 84-27 30-210 313-647 1002l-16 25 25-16c14-9 236-150 495-315z"
      transform="matrix(.1 0 0 -.1 0 512)"
      fill={fill}
    />
  </Svg>
);