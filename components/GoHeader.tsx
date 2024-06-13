import { ReactElement } from 'react';
import React from 'react';
import {
  Pressable,
  StyleProp,
  TextStyle,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from 'react-native';
import {
  createStyleSheet,
  UnistylesRuntime,
  useStyles,
} from 'react-native-unistyles';

import GoIcon, { GoIconTypes, isGoIconType } from '@/components/GoIcon';
import GoText, { GoTextProps } from '@/components/GoText';

export interface GoHeaderProps {
  titleMode?: 'center' | 'flex';
  titleStyle?: StyleProp<TextStyle>;
  titleContainerStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  backgroundColor?: string;
  title?: GoTextProps['text'];
  leftIcon?: GoIconTypes | React.ReactNode;
  leftIconColor?: string;
  leftText?: GoTextProps['text'];
  LeftActionComponent?: ReactElement;
  onLeftPress?: TouchableOpacityProps['onPress'];
  rightIcon?: GoIconTypes;
  rightIconColor?: string;
  rightText?: GoTextProps['text'];
  RightActionComponent?: ReactElement;
  onRightPress?: TouchableOpacityProps['onPress'];
}

interface GoHeaderActionProps {
  backgroundColor?: string;
  icon?: GoIconTypes | React.ReactNode;
  iconColor?: string;
  text?: GoTextProps['text'];
  onPress?: TouchableOpacityProps['onPress'];
  ActionComponent?: ReactElement;
}

export default function GoHeader(props: GoHeaderProps) {
  const {
    theme: { colors },
    styles,
  } = useStyles(stylesheet);

  const {
    backgroundColor = colors.base100,
    LeftActionComponent,
    leftIcon,
    leftIconColor = colors.baseContent,
    leftText,
    onLeftPress,
    onRightPress,
    RightActionComponent,
    rightIcon,
    rightIconColor,
    rightText,
    title,
    titleMode = 'center',
    titleContainerStyle: $titleContainerStyleOverride,
    style: $styleOverride,
    titleStyle: $titleStyleOverride,
    containerStyle: $containerStyleOverride,
  } = props;

  const titleContent = title;

  return (
    <View
      style={[styles.container, { backgroundColor }, $containerStyleOverride]}
    >
      <View style={[styles.wrapper, $styleOverride]}>
        <HeaderAction
          text={leftText}
          icon={leftIcon}
          iconColor={leftIconColor}
          onPress={onLeftPress}
          backgroundColor={backgroundColor}
          ActionComponent={LeftActionComponent}
        />

        {!!titleContent && (
          <View
            style={[
              titleMode === 'center' && styles.titleWrapperCenter,
              titleMode === 'flex' && styles.titleWrapperFlex,
              $titleContainerStyleOverride,
            ]}
          >
            <GoText
              preset="bold"
              text={titleContent}
              style={[styles.title, $titleStyleOverride]}
            />
          </View>
        )}

        <HeaderAction
          text={rightText}
          icon={rightIcon}
          iconColor={rightIconColor}
          onPress={onRightPress}
          backgroundColor={backgroundColor}
          ActionComponent={RightActionComponent}
        />
      </View>
    </View>
  );
}

function HeaderAction(props: GoHeaderActionProps) {
  const { backgroundColor, icon, text, onPress, ActionComponent, iconColor } =
    props;

  const { styles } = useStyles(stylesheet);

  const $actionText: TextStyle = {
    color: 'red',
  };

  const content = text;

  if (ActionComponent) return ActionComponent;

  if (content) {
    return (
      <Pressable
        style={[styles.actionTextContainer, { backgroundColor }]}
        onPress={onPress}
        disabled={!onPress}
      >
        <GoText preset="bold" text={content} style={$actionText} />
      </Pressable>
    );
  }

  if (icon && isGoIconType(icon)) {
    return (
      <GoIcon
        size={24}
        icon={icon}
        color={iconColor}
        onPress={onPress}
        containerStyle={[styles.actionIconContainer, { backgroundColor }]}
      />
    );
  } else if (React.isValidElement(icon)) {
    return (
      <Pressable style={styles.actionIconContainer} onPress={onPress}>
        {icon}
      </Pressable>
    );
  }

  return <View style={[styles.actionFillerContainer, { backgroundColor }]} />;
}

const stylesheet = createStyleSheet(({ size, typography }) => ({
  container: {
    width: '100%',
    paddingTop: UnistylesRuntime.insets.top,
    paddingHorizontal: {
      xs: size.sm,
      sm: size.sm,
      md: size.xl,
    },
  },
  wrapper: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleWrapperCenter: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    position: 'absolute',
    paddingHorizontal: size.xxl,
    zIndex: 1,
  },
  titleWrapperFlex: {
    justifyContent: 'center',
    flexGrow: 1,
  },
  title: {
    textAlign: 'center',
    fontFamily: typography.secondary.bold,
    fontSize: size.lg,
  },
  actionTextContainer: {
    flexGrow: 0,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    paddingHorizontal: size.md,
    zIndex: 2,
  },
  actionIconContainer: {
    flexGrow: 0,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    paddingHorizontal: size.md,
    zIndex: 2,
  },
  actionFillerContainer: {
    width: 16,
  },
}));
