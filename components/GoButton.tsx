import {
  ActivityIndicator,
  Pressable,
  PressableProps,
  StyleProp,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import GoText, { GoTextProps } from '@/components/GoText';

type PresetKeys = 'primary' | 'secondary' | 'outline' | 'accent' | undefined;
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
  RightAccessory?: React.ReactNode;
  LeftAccessory?: React.ReactNode;
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
    RightAccessory,
    LeftAccessory,
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
      // style={styles.container}
      style={({ pressed }) => [styles.container(pressed)]}
      accessibilityState={{ disabled: !!disabled }}
      {...rest}
      disabled={disabled}
      onPress={onPress}
    >
      {(state) => (
        <>
          {/* {!!LeftAccessory && (
            <LeftAccessory
              style={$leftAccessoryStyle}
              pressableState={state}
              disabled={disabled}
            />
          )} */}

          <View>
            <GoText text={text} style={styles.buttonText}>
              {children}
            </GoText>
            {loading && <ActivityIndicator size="small" color={'red'} />}
          </View>

          {/* {!!RightAccessory && (
            <RightAccessory
              style={$rightAccessoryStyle}
              pressableState={state}
              disabled={disabled}
            />
          )} */}
        </>
      )}
    </Pressable>
  );
}

const stylesheet = createStyleSheet(
  ({ size, colors, margins, typography }) => ({
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
        },
      },
    }),
    buttonText: {
      fontFamily: typography.secondary.bold,
      textAlign: 'center',
      flexShrink: 1,
      flexGrow: 0,
      zIndex: 2,
      letterSpacing: 1,
      variants: {
        size: {
          sm: {},
          md: {
            ...size.lg,
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
