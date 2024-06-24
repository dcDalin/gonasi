import { yupResolver } from '@hookform/resolvers/yup';
import { ComponentType, useEffect, useMemo, useRef, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { ActivityIndicator, TextInput, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import * as Yup from 'yup';

import GoButton from '@/components/GoButton';
import GoIcon from '@/components/GoIcon';
import {
  GoTextField,
  GoTextFieldAccessoryProps,
} from '@/components/GoTextField';
import { useDebounce } from '@/components/hooks/useDebounce';
import { resetErrors, signUpUser } from '@/store/authSlice';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { checkUsernameExists } from '@/store/usernameExistsSlice';

const signUpFormValidationSchema = Yup.object().shape({
  username: Yup.string()
    .required('Username is required')
    .matches(
      /^[a-zA-Z0-9_]+$/,
      'Username can only contain letters, numbers, and underscores'
    )
    .min(3, 'Username must be at least 3 characters long')
    .max(20, 'Username must be at most 20 characters long'),
  email: Yup.string()
    .required('Email is required')
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      'Invalid email address'
    )
    .min(3, 'Email must be at least 3 characters long')
    .max(40, 'Email must be at most 40 characters long'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters long')
    .max(20, 'Password must be at most 20 characters long')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    ),
});

export type SignUpFormValues = {
  username: string;
  email: string;
  password: string;
};

export default function SignUpForm() {
  const {
    styles,
    theme: { colors },
  } = useStyles(stylesheet);

  const [isAuthPasswordHidden, setIsAuthPasswordHidden] = useState(true);
  const authPasswordInput = useRef<TextInput>(null);

  const dispatch = useAppDispatch();
  const { error, status } = useAppSelector((state) => state.auth);

  const { status: usernameExistsStatus, username } = useAppSelector(
    (state) => state.usernameExists
  );

  const isLoading = status === 'loading';

  const {
    handleSubmit,
    watch,
    setError,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signUpFormValidationSchema),
    mode: 'onChange',
  });

  const watchUsernameChange = watch('username');

  const debouncedUsername = useDebounce(watchUsernameChange, 500);

  useEffect(() => {
    if (debouncedUsername) {
      dispatch(checkUsernameExists(debouncedUsername));
    }
  }, [debouncedUsername, dispatch]);

  useEffect(() => {
    if (debouncedUsername && username) {
      setError('username', {
        type: 'usernameExists',
        message: 'Username already exists',
      });
    }
  }, [debouncedUsername, setError, username]);

  useEffect(() => {
    if (error) {
      Toast.show({
        type: 'error',
        text2: error,
      });

      dispatch(resetErrors());
    }
  }, [dispatch, error]);

  const PasswordRightAccessory: ComponentType<GoTextFieldAccessoryProps> =
    useMemo(
      () =>
        function PasswordRightAccessory(props: GoTextFieldAccessoryProps) {
          return (
            <GoIcon
              icon={isAuthPasswordHidden ? 'view' : 'hidden'}
              color={props.status === 'error' ? colors.error : colors.neutral}
              containerStyle={props.style}
              size={20}
              disabled={isLoading}
              onPress={() => setIsAuthPasswordHidden(!isAuthPasswordHidden)}
            />
          );
        },
      [colors.error, colors.neutral, isAuthPasswordHidden, isLoading]
    );

  const UsernameLeftAccessory: ComponentType<GoTextFieldAccessoryProps> =
    useMemo(
      () =>
        function UsernameLeftAccessory(props: GoTextFieldAccessoryProps) {
          return (
            <GoIcon
              icon="user"
              color={props.status === 'error' ? colors.error : colors.neutral}
              size={18}
              containerStyle={props.style}
              disabled={isLoading}
            />
          );
        },
      [colors.error, colors.neutral, isLoading]
    );

  const UsernameRightLoadingAccessory: ComponentType<
    GoTextFieldAccessoryProps
  > = (props: GoTextFieldAccessoryProps) => (
    <View style={props.style}>
      {usernameExistsStatus === 'loading' ? <ActivityIndicator /> : null}
    </View>
  );

  const EmailLeftAccessory: ComponentType<GoTextFieldAccessoryProps> = useMemo(
    () =>
      function EmailLeftAccessory(props: GoTextFieldAccessoryProps) {
        return (
          <GoIcon
            icon="email"
            color={props.status === 'error' ? colors.error : colors.neutral}
            size={18}
            containerStyle={props.style}
            disabled={isLoading}
          />
        );
      },
    [colors.error, colors.neutral, isLoading]
  );

  const PasswordLeftAccessory: ComponentType<GoTextFieldAccessoryProps> =
    useMemo(
      () =>
        function PasswordLeftAccessory(props: GoTextFieldAccessoryProps) {
          return (
            <GoIcon
              icon="key"
              color={props.status === 'error' ? colors.error : colors.neutral}
              size={18}
              containerStyle={props.style}
              disabled={isLoading}
            />
          );
        },
      [colors.error, colors.neutral, isLoading]
    );

  const onSubmit: SubmitHandler<SignUpFormValues> = async (signUpPayload) => {
    const { username, email, password } = signUpPayload;

    await dispatch(
      signUpUser({
        email,
        password,
        options: {
          data: {
            username: username.toLowerCase(),
          },
        },
      })
    );
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
            autoComplete="username"
            autoCorrect={false}
            label="Username"
            placeholder="Enter your username"
            helper={errors?.username?.message}
            LeftAccessory={UsernameLeftAccessory}
            RightAccessory={UsernameRightLoadingAccessory}
            status={
              errors?.username?.message
                ? 'error'
                : isLoading
                  ? 'disabled'
                  : undefined
            }
          />
        )}
        name="username"
      />
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
            status={
              errors?.email?.message
                ? 'error'
                : isLoading
                  ? 'disabled'
                  : undefined
            }
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
            status={
              errors?.password?.message
                ? 'error'
                : isLoading
                  ? 'disabled'
                  : undefined
            }
            onSubmitEditing={() => authPasswordInput.current?.focus()}
          />
        )}
        name="password"
      />
      <GoButton
        text="Signup"
        preset="primary"
        onPress={handleSubmit(onSubmit)}
        loading={isLoading}
        disabled={isLoading}
      />
    </View>
  );
}

const stylesheet = createStyleSheet(({ size }) => ({
  wrapper: {
    gap: size.lg,
  },
}));
