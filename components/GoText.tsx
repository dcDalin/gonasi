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

const stylesheet = createStyleSheet(({ size, typography, colors }) => ({
  textPresets: {
    color: colors.baseContent,
    variants: {
      preset: {
        default: {
          ...size.sm,
          fontFamily: typography.primary.normal,
        },
        bold: {
          ...size.sm,
          fontFamily: typography.primary.bold,
        },
        heading: {
          ...size.xxl,
          fontFamily: typography.secondary.bold,
        },
        subheading: {
          ...size.lg,
          fontFamily: typography.primary.normal,
        },
        formLabel: {
          ...size.sm,
          fontFamily: typography.primary.semiBold,
        },
        formHelper: {
          ...size.xs,
          fontFamily: typography.primary.light,
        },
        h1: {
          ...size.xxl,
          fontFamily: typography.secondary.bold,
        },
        h2: {
          ...size.xl,
          fontFamily: typography.secondary.bold,
        },
        h3: {
          ...size.lg,
          fontFamily: typography.secondary.medium,
        },
        h4: {
          ...size.md,
          fontFamily: typography.secondary.medium,
        },
        h5: {
          ...size.sm,
          fontFamily: typography.secondary.normal,
        },
        p1: {
          ...size.md,
          fontFamily: typography.primary.normal,
        },
        p2: {
          ...size.sm,
          fontFamily: typography.primary.normal,
        },
        p3: {
          ...size.xs,
          fontFamily: typography.primary.normal,
        },
        p4: {
          ...size.xxs,
          fontFamily: typography.primary.normal,
        },
        p5: {
          ...size.xxxs,
          fontFamily: typography.primary.normal,
        },
      },
    },
  },
}));
