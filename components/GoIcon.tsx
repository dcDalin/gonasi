import { Image, ImageStyle } from 'expo-image';
import * as React from 'react';
import { ComponentType } from 'react';
import {
  Pressable,
  PressableProps,
  StyleProp,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';

export type GoIconTypes = keyof typeof iconRegistry;

export const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

interface IconProps extends PressableProps {
  icon: GoIconTypes;
  color?: string;
  size?: number;
  style?: StyleProp<ImageStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  onPress?: PressableProps['onPress'];
}

export default function GoIcon(props: IconProps) {
  const {
    icon,
    color,
    size,
    style: $imageStyleOverride,
    containerStyle: $containerStyleOverride,
    ...WrapperProps
  } = props;

  const isPressable = !!WrapperProps.onPress;
  const Wrapper = (WrapperProps?.onPress ? Pressable : View) as ComponentType<
    PressableProps | ViewProps
  >;

  const $imageStyle: StyleProp<ImageStyle> = [
    color !== undefined && { tintColor: color },
    size !== undefined && { width: size, height: size },
    $imageStyleOverride,
  ];

  return (
    <Wrapper
      role={isPressable ? 'button' : undefined}
      {...WrapperProps}
      style={$containerStyleOverride}
    >
      <Image
        style={$imageStyle}
        contentFit="contain"
        source={iconRegistry[icon]}
        placeholder={{ blurhash }}
      />
    </Wrapper>
  );
}

export const iconRegistry = {
  appLogo: require('../assets/images/icon.png'),
  back: require('../assets/icons/back.png'),
  rightArrow: require('../assets/icons/right-arrow.png'),
  google: require('../assets/icons/google.png'),
  facebook: require('../assets/icons/facebook.png'),
  apple: require('../assets/icons/apple.png'),
  appleBlack: require('../assets/icons/apple-black.png'),
  hidden: require('../assets/icons/hidden.png'),
  view: require('../assets/icons/view.png'),
  email: require('../assets/icons/email.png'),
  key: require('../assets/icons/key.png'),
  user: require('../assets/icons/user.png'),
};

// Type guard to check if a value is of type GoIconTypes
export function isGoIconType(value: any): value is GoIconTypes {
  return Object.keys(iconRegistry).includes(value);
}
