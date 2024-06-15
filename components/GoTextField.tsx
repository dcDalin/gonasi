import React, {
  ComponentType,
  forwardRef,
  Ref,
  useImperativeHandle,
  useRef,
} from 'react';
import {
  Pressable,
  StyleProp,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import GoText, { GoTextProps } from '@/components/GoText';
import adjustColorBrightness from '@/utils/adjustColorBrightness';

export interface GoTextFieldAccessoryProps {
  style: StyleProp<any>;
  status: TextFieldProps['status'];
  multiline: boolean;
  editable: boolean;
}

export interface TextFieldProps extends Omit<TextInputProps, 'ref'> {
  status?: 'error' | 'disabled';
  label: GoTextProps['text'];
  LabelTextProps?: GoTextProps;
  helper?: GoTextProps['text'];
  HelperTextProps?: GoTextProps;
  placeholder?: GoTextProps['text'];
  style?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  inputWrapperStyle?: StyleProp<ViewStyle>;
  RightAccessory?: ComponentType<GoTextFieldAccessoryProps>;
  LeftAccessory?: ComponentType<GoTextFieldAccessoryProps>;
}

export const GoTextField = forwardRef(function TextField(
  props: TextFieldProps,
  ref: Ref<TextInput>
) {
  const {
    label,
    placeholder,
    helper,
    status,
    RightAccessory,
    LeftAccessory,
    HelperTextProps,
    LabelTextProps,
    style: $inputStyleOverride,
    containerStyle: $containerStyleOverride,
    inputWrapperStyle: $inputWrapperStyleOverride,
    ...TextInputProps
  } = props;
  const input = useRef<TextInput>(null);

  const {
    theme: { colors },
    styles,
  } = useStyles(stylesheet);

  const disabled = TextInputProps.editable === false || status === 'disabled';

  const $containerStyles = [$containerStyleOverride];

  const $labelStyles = [styles.labelStyle, LabelTextProps?.style];

  const $inputWrapperStyles = [
    styles.inputWrapperStyle,
    status === 'error' && { borderColor: colors.error },
    TextInputProps.multiline && { minHeight: 112 },
    LeftAccessory && { paddingStart: 0 },
    RightAccessory && { paddingEnd: 0 },
    $inputWrapperStyleOverride,
  ];

  const $inputStyles: StyleProp<TextStyle> = [
    styles.inputStyle,
    disabled && { color: adjustColorBrightness(colors.baseContent, 80) },

    TextInputProps.multiline && { height: 'auto' },
    $inputStyleOverride,
  ];

  const $helperStyles = [
    styles.helperStyle,
    status === 'error' && { color: colors.error },
    HelperTextProps?.style,
  ];

  /**
   *
   */
  function focusInput() {
    if (disabled) return;

    input.current?.focus();
  }

  useImperativeHandle(ref, () => input.current as TextInput);

  return (
    <Pressable
      style={$containerStyles}
      onPress={focusInput}
      accessibilityState={{ disabled }}
    >
      {!!label && (
        <GoText
          preset="formLabel"
          text={label}
          {...LabelTextProps}
          style={$labelStyles}
        />
      )}

      <View style={$inputWrapperStyles}>
        {!!LeftAccessory && (
          <LeftAccessory
            style={styles.leftAccessoryStyle}
            status={status}
            editable={!disabled}
            multiline={TextInputProps.multiline ?? false}
          />
        )}

        <TextInput
          ref={input}
          underlineColorAndroid={colors.transparent}
          textAlignVertical="top"
          placeholder={placeholder}
          placeholderTextColor={adjustColorBrightness(colors.baseContent)}
          {...TextInputProps}
          editable={!disabled}
          style={$inputStyles}
        />

        {!!RightAccessory && (
          <RightAccessory
            style={styles.rightAccessoryStyle}
            status={status}
            editable={!disabled}
            multiline={TextInputProps.multiline ?? false}
          />
        )}
      </View>

      {!!helper && (
        <GoText
          preset="formHelper"
          text={helper}
          {...HelperTextProps}
          style={$helperStyles}
        />
      )}
    </Pressable>
  );
});

const stylesheet = createStyleSheet(({ colors, size, typography }) => ({
  labelStyle: {
    marginBottom: size.xxs,
  },
  inputWrapperStyle: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderWidth: 1,
    borderRadius: size.sm,
    backgroundColor: colors.transparent,
    borderColor: colors.neutral,
    overflow: 'hidden',
  },
  inputStyle: {
    flex: 1,
    alignSelf: 'stretch',
    fontFamily: typography.primary.normal,
    color: colors.baseContent,
    fontSize: 18,
    height: 24,
    // https://github.com/facebook/react-native/issues/21720#issuecomment-532642093
    paddingVertical: 0,
    paddingHorizontal: 0,
    marginVertical: size.sm,
    marginHorizontal: size.sm,
  },
  helperStyle: {
    paddingTop: size.xxxs,
    paddingLeft: size.sm,
    fontFamily: typography.primary.normalItalic,
  },
  rightAccessoryStyle: {
    marginEnd: size.xs,
    height: 46,
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftAccessoryStyle: {
    marginStart: size.xs,
    height: 46,
    justifyContent: 'center',
    alignItems: 'center',
  },
}));
