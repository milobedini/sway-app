declare module "flubber" {
  export function interpolate<S extends boolean = true>(
    p1: string,
    p2: string,
    options?: { maxSegmentLength?: number; string?: S }
  ): (t: number) => S extends true ? string : [number, number][];
}
