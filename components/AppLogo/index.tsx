import GoIcon from '@/components/GoIcon';

interface IAppLogoProps {
  size?: number;
}

export default function AppLogo(props: IAppLogoProps) {
  const { size = 80 } = props;

  return <GoIcon icon={'appLogo'} size={size} />;
}
