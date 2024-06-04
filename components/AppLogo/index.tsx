import Icon from '@/components/Icon';

interface IAppLogoProps {
  size?: number;
}

export default function AppLogo(props: IAppLogoProps) {
  const { size = 80 } = props;

  return <Icon icon={'appLogo'} size={size} />;
}
