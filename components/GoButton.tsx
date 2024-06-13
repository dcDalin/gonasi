import { ComponentType } from 'react';
import {
  ActivityIndicator,
  Pressable,
  PressableProps,
  PressableStateCallbackType,
  StyleProp,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import GoText, { GoTextProps } from '@/components/GoText';
import adjustColorBrightness from '@/utils/adjustColorBrightness';

export interface ButtonAccessoryProps {
  style: StyleProp<any>;
  pressableState: PressableStateCallbackType;
  disabled?: boolean;
}

type PresetKeys =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'accent'
  | 'ghost'
  | undefined;
type SizeKeys = 'sm' | 'md' | 'lg' | undefined;

interface IGoButtonProps extends PressableProps {
  text?: GoTextProps['text'];
  style?: StyleProp<ViewStyle>;
  pressedStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  pressedTextStyle?: StyleProp<TextStyle>;
  disabledTextStyle?: StyleProp<TextStyle>;
  size?: SizeKeys;
  preset?: PresetKeys;
  LeftAccessory?: ComponentType<ButtonAccessoryProps>;
  RightAccessory?: ComponentType<ButtonAccessoryProps>;
  children?: React.ReactNode;
  disabled?: boolean;
  disabledStyle?: StyleProp<ViewStyle>;
  loading?: boolean;
  onPress: () => void;
}

export default function GoButton(props: IGoButtonProps) {
  const {
    text,
    style: $viewStyleOverride,
    pressedStyle: $pressedViewStyleOverride,
    textStyle: $textStyleOverride,
    pressedTextStyle: $pressedTextStyleOverride,
    disabledTextStyle: $disabledTextStyleOverride,
    children,
    LeftAccessory,
    RightAccessory,
    disabled,
    disabledStyle: $disabledViewStyleOverride,
    preset,
    size = 'md',
    loading,
    onPress,
    ...rest
  } = props;

  const { styles } = useStyles(stylesheet, {
    preset,
    size,
  });

  return (
    <Pressable
      style={({ pressed }) => [styles.container(pressed)]}
      accessibilityState={{ disabled: !!disabled }}
      {...rest}
      disabled={disabled}
      onPress={onPress}
    >
      {(state) => (
        <>
          {!!LeftAccessory && (
            <LeftAccessory
              style={styles.leftAccessory}
              pressableState={state}
              disabled={disabled}
            />
          )}

          <View>
            <GoText text={text} style={styles.buttonText}>
              {children}
            </GoText>
            {loading && <ActivityIndicator size="small" color={'red'} />}
          </View>

          {!!RightAccessory && (
            <RightAccessory
              style={styles.rightAccessory}
              pressableState={state}
              disabled={disabled}
            />
          )}
        </>
      )}
    </Pressable>
  );
}

const stylesheet = createStyleSheet(
  ({ fontSize, colors, size, typography }) => ({
    container: (pressed: boolean) => ({
      borderTopWidth: 2,
      borderLeftWidth: 2,
      borderRightWidth: 2,
      borderBottomWidth: pressed ? 2 : 4,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      overflow: 'hidden',
      marginTop: pressed ? 2 : 0,
      variants: {
        size: {
          sm: {},
          md: {
            height: pressed ? 46 : 48,
            borderRadius: 16,
          },
          lg: {},
        },
        preset: {
          default: {
            borderColor: colors.neutralLight,
            backgroundColor: pressed ? colors.neutralLight : colors.neutral,
          },
          primary: {
            borderColor: colors.primaryLight,
            backgroundColor: pressed ? colors.primaryLight : colors.primary,
          },
          secondary: {
            borderColor: colors.secondaryLight,
            backgroundColor: pressed ? colors.secondaryLight : colors.secondary,
          },
          outline: {
            borderColor: colors.neutral,
            backgroundColor: colors.transparent,
          },
          accent: {
            borderColor: colors.accentLight,
            backgroundColor: pressed ? colors.accentLight : colors.accent,
          },
          ghost: {
            borderColor: colors.transparent,
            backgroundColor: colors.transparent,
          },
        },
      },
    }),
    leftAccessory: {
      marginStart: size.xs,
      zIndex: 1,
    },
    rightAccessory: {
      marginEnd: size.xs,
      zIndex: 1,
    },
    buttonText: {
      fontFamily: typography.secondary.bold,
      textAlign: 'center',
      flexShrink: 1,
      flexGrow: 0,
      zIndex: 2,
      letterSpacing: 1,
      paddingHorizontal: size.lg,
      variants: {
        size: {
          sm: {},
          md: {
            ...fontSize.lg,
            fontFamily: typography.secondary.medium,
          },
          lg: {},
        },
        preset: {
          default: {
            color: colors.neutralContent,
          },
          primary: {
            color: colors.primaryContent,
          },
          secondary: {
            color: colors.secondaryContent,
          },
          outline: {
            color: colors.neutralContent,
          },
          accent: {
            color: colors.accentContent,
          },
        },
      },
    },
  })
);
