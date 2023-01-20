import {
  Path,
  Skia,
  useClockValue,
  useComputedValue,
  Canvas,
  vec,
  useTouchHandler,
  useTiming,
} from "@shopify/react-native-skia";
import React, { useEffect, useState } from "react";
import { Dimensions } from "react-native";
import { createNoise2D } from "simplex-noise";
import { SafeAreaInsetsContext } from "react-native-safe-area-context";
import alea from "alea";

import { Play } from "./Play2";
import { Background } from "./Background";
import { Overlay } from "./Overlay";
import { useContextBridge } from "./useContextBridge";

const C = 0.55228474983079;
const F = 0.0002;
const A = 0.2;
const { width, height } = Dimensions.get("window");
const c = vec(width / 2, height / 2);
const r = 50;

export const Headspace = () => {
  const clock = useClockValue();

  const ContextBridge = useContextBridge(SafeAreaInsetsContext);
  const [toggled, setToggled] = useState(false);
  useEffect(() => {
    clock.stop();
  }, [clock]);
  const path = useComputedValue(() => {
    const p = Skia.Path.Make();
    return p;
  }, [clock]);

  return (
    <Canvas style={{ flex: 1 }}>
      <ContextBridge>
        <Background clock={clock} />
        <Path path={path} color="#3B3A3A" />
        <Play c={c} r={r} />
        <Overlay />
      </ContextBridge>
    </Canvas>
  );
};
