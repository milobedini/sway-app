import { ImageSourcePropType } from "react-native";

import breathe from "../../../../../assets/hero_mob.png";
import sit from "../../../../../assets/hero_mob_3.png";
import grow from "../../../../../assets/hero_mob_2.png";

const titles = ["breathe", "sit", "grow"];
const descriptions = [
  "We believe that meditation is the key to a better, healthier life. By taking the time to relax, center, and focus on yourself, you can create a more positive and peaceful state of mind. Our app is designed to help you relax, de-stress, and find your inner calm.",
  "Our goal is to help you create a regular meditation practice and give you the tools to become the best version of yourself. We offer guided meditation sessions, tips and techniques to help you get the most out of your practice.",
  "We have a supportive community, allowing our members to connect with like-minded people and reach out to ask questions or share stories. Ready to get started? Let’s begin your journey to a more mindful life. Join us by hitting the Create Account button!",
];
const images = [breathe, sit, grow];

export const welcomeConstants = {
  indicatorSize: 12,
  spacing: 14,
  buttonSize: 64,
  data: [...Array(3).keys()].map((i) => ({
    key: i,
    title: titles[i],
    description: descriptions[i],
    // image: `https://source.unsplash.com/random/${i}`,
    image: images[i],
  })),
};

export type WelcomeDataType = {
  key: number;
  title: string;
  description: string;
  image: ImageSourcePropType;
};
