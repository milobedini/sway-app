/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-namespace */
import { useMemo } from 'react';
import { ImageStyle, TextStyle, ViewStyle } from 'react-native';
import { useMediaQuery } from 'react-responsive';

type NamedStyles<T> = { [P in keyof T]: ViewStyle | TextStyle | ImageStyle };

type SizeClass = { small?: true; medium?: true; large?: true };

type SizedStyleSheet<T> = { sizeClass: SizeClass; styles: NamedStyles<T> };

type ResponsiveStyleSheets<T> = {
  override<T2 extends NamedStyles<T> | NamedStyles<any>>(
    sizeClass: SizeClass,
    styles: T2
  ): ResponsiveStyleSheets<T & T2>;
  styles: SizedStyleSheet<T>[];
};

export namespace ResponsiveStyleSheet {
  export function create<T extends NamedStyles<T> | NamedStyles<any>>(
    base: T
  ): ResponsiveStyleSheets<T> {
    const allStyles: SizedStyleSheet<unknown>[] = [];

    const override = <T2>(sizeClass: SizeClass, other: NamedStyles<T2>) => {
      allStyles.push({ sizeClass, styles: other });
      return {
        styles: allStyles,
        override
      };
    };

    return override(
      { small: true, medium: true, large: true },
      base
    ) as ResponsiveStyleSheets<T>;
  }
}

export const useSizeClass = (): 'small' | 'medium' | 'large' => {
  const isLarge = useMediaQuery({ minWidth: 1224 });
  const isMedium = useMediaQuery({ minWidth: 900 });

  const size = useMemo(() => {
    if (isLarge) {
      return 'large';
    }

    if (isMedium) {
      return 'medium';
    }

    return 'small';
  }, [isLarge, isMedium]);
  return size;
};

export const useResponsiveStyleSheet = <T extends NamedStyles<T>>({
  styles
}: ResponsiveStyleSheets<T>): T => {
  const size = useSizeClass();

  // return useMemo(() => {
  //   const others = styles.filter(({ sizeClass }) => sizeClass[size]);

  //   const keys = others
  //     .map(o => Object.keys(o.styles))
  //     .flat()
  //     .distinct() as (keyof T)[];

  //   const p = keys.toRecord(
  //     k => k,
  //     k =>
  //       others
  //         .map(o => o.styles[k])
  //         .flat()
  //         .compact()
  //   );

  //   return p as unknown as T;
  // }, [size]);
  return useMemo(() => {
    const others = styles.filter(({ sizeClass }) => sizeClass[size]);

    const keys = others
      .map(o => Object.keys(o.styles))
      .flat()
      .distinct() as (keyof T)[];

    const p = keys.toRecord(
      k => k,
      k =>
        others
          .map(o => o.styles[k])
          .flat()
          .compact()
    );

    return p as unknown as T;
  }, [size]);
};
