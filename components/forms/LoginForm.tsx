import { yupResolver } from '@hookform/resolvers/yup';
import { useRef, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { TextInput, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import * as Yup from 'yup';

import GoIcon from '@/components/GoIcon';
import {
  GoTextField,
  GoTextFieldAccessoryProps,
} from '@/components/GoTextField';

import GoButton from '../GoButton';

const loginFormValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .min(10, 'Password must be at least 10 characters long')
    .max(50, 'Password must be at most 50 characters long'),
});

export type LoginFormValues = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const [isAuthPasswordHidden, setIsAuthPasswordHidden] = useState(true);
  const authPasswordInput = useRef<TextInput>(null);

  const {
    styles,
    theme: { colors },
  } = useStyles(stylesheet);

  const PasswordRightAccessory = (props: GoTextFieldAccessoryProps) => (
    <GoIcon
      icon={isAuthPasswordHidden ? 'view' : 'hidden'}
      color={props.status === 'error' ? colors.error : colors.neutral}
      containerStyle={props.style}
      size={20}
      onPress={() => setIsAuthPasswordHidden(!isAuthPasswordHidden)}
    />
  );

  const EmailLeftAccessory = (props: GoTextFieldAccessoryProps) => (
    <GoIcon
      icon="email"
      color={props.status === 'error' ? colors.error : colors.neutral}
      size={20}
      containerStyle={props.style}
    />
  );

  const PasswordLeftAccessory = (props: GoTextFieldAccessoryProps) => (
    <GoIcon
      icon="key"
      color={props.status === 'error' ? colors.error : colors.neutral}
      size={20}
      containerStyle={props.style}
    />
  );

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginFormValidationSchema),
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<LoginFormValues> = async (loginPayload) => {
    // await dispatch(loginUser(loginPayload));
    console.log('Payload is: ', loginPayload);
  };

  return (
    <View style={styles.wrapper}>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <GoTextField
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            autoCapitalize="none"
            autoComplete="email"
            autoCorrect={false}
            inputMode="email"
            label="Email"
            placeholder="Enter your email address"
            helper={errors?.email?.message}
            LeftAccessory={EmailLeftAccessory}
            status={errors?.email?.message ? 'error' : undefined}
            onSubmitEditing={() => authPasswordInput.current?.focus()}
          />
        )}
        name="email"
      />
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <GoTextField
            ref={authPasswordInput}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            autoCapitalize="none"
            autoComplete="password"
            autoCorrect={false}
            secureTextEntry={isAuthPasswordHidden}
            label="Password"
            placeholder="Enter your password"
            helper={errors?.password?.message}
            LeftAccessory={PasswordLeftAccessory}
            RightAccessory={PasswordRightAccessory}
            status={errors?.password?.message ? 'error' : undefined}
            onSubmitEditing={() => authPasswordInput.current?.focus()}
          />
        )}
        name="password"
      />
      <GoButton
        text="Login"
        preset="primary"
        onPress={handleSubmit(onSubmit)}
        // loading={loading}
        // disabled={loading}
      />
    </View>
  );
}

const stylesheet = createStyleSheet(({ size }) => ({
  wrapper: {
    gap: size.lg,
  },
}));
