import { Link } from 'expo-router';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import GoText from '@/components/GoText';

interface IGoLinkProps {
  text: string;
  href: string;
}

export default function GoLink(props: IGoLinkProps) {
  const { text, href } = props;
  const { styles } = useStyles(stylesheet);
  return (
    <Link href={href}>
      <GoText text={text} style={styles.link} />
    </Link>
  );
}

const stylesheet = createStyleSheet(({ typography }) => ({
  link: {
    textDecorationLine: 'underline',
    fontFamily: typography.primary.semiBold,
  },
}));
