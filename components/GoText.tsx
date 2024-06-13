import React from 'react';
import {
  StyleProp,
  Text as RNText,
  TextProps as RNTextProps,
  TextStyle,
} from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

type GoTextPresetKeys =
  | 'bold'
  | 'heading'
  | 'subheading'
  | 'formLabel'
  | 'formHelper'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'p1'
  | 'p2'
  | 'p3'
  | 'p4'
  | 'p5'
  | undefined;

export interface GoTextProps extends RNTextProps {
  text?: string;
  style?: StyleProp<TextStyle>;
  preset?: GoTextPresetKeys;
  children?: React.ReactNode;
}

export default function GoText(props: GoTextProps) {
  const { text, children, preset, style: $styleOverride, ...rest } = props;

  const content = text || children;

  const { styles } = useStyles(stylesheet, {
    preset,
  });

  return (
    <RNText {...rest} style={[styles.textPresets, $styleOverride]}>
      {content}
    </RNText>
  );
}

const stylesheet = createStyleSheet(({ fontSize, typography, colors }) => ({
  textPresets: {
    color: colors.baseContent,
    variants: {
      preset: {
        default: {
          ...fontSize.sm,
          fontFamily: typography.primary.normal,
        },
        bold: {
          ...fontSize.sm,
          fontFamily: typography.primary.bold,
        },
        heading: {
          ...fontSize.xxl,
          fontFamily: typography.secondary.bold,
        },
        subheading: {
          ...fontSize.lg,
          fontFamily: typography.primary.normal,
        },
        formLabel: {
          ...fontSize.sm,
          fontFamily: typography.primary.semiBold,
        },
        formHelper: {
          ...fontSize.xs,
          fontFamily: typography.primary.light,
        },
        h1: {
          ...fontSize.xxl,
          fontFamily: typography.secondary.bold,
        },
        h2: {
          ...fontSize.xl,
          fontFamily: typography.secondary.bold,
        },
        h3: {
          ...fontSize.lg,
          fontFamily: typography.secondary.medium,
        },
        h4: {
          ...fontSize.md,
          fontFamily: typography.secondary.medium,
        },
        h5: {
          ...fontSize.sm,
          fontFamily: typography.secondary.normal,
        },
        p1: {
          ...fontSize.md,
          fontFamily: typography.primary.normal,
        },
        p2: {
          ...fontSize.sm,
          fontFamily: typography.primary.normal,
        },
        p3: {
          ...fontSize.xs,
          fontFamily: typography.primary.normal,
        },
        p4: {
          ...fontSize.xxs,
          fontFamily: typography.primary.normal,
        },
        p5: {
          ...fontSize.xxxs,
          fontFamily: typography.primary.normal,
        },
      },
    },
  },
}));
