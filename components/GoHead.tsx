import ExpoHead from 'expo-router/head';
import { Platform } from 'react-native';

interface GoHeadProps {
  title: string;
}

export default function GoHead(props: GoHeadProps) {
  const { title } = props;
  return (
    <>
      {Platform.OS === 'web' ? (
        <ExpoHead>
          <title>{title} - gonasi</title>
          <meta
            name="gonasi"
            content="The Ultimate All-in-One Driving Solution!"
          />
        </ExpoHead>
      ) : null}
    </>
  );
}
