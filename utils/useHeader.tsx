import { useNavigation } from 'expo-router';
import React, { useLayoutEffect } from 'react';

import GoHeader, { GoHeaderProps } from '@/components/GoHeader';

export function useHeader(
  headerProps: GoHeaderProps,
  deps: Parameters<typeof useLayoutEffect>[1] = []
) {
  const navigation = useNavigation();

  React.useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => <GoHeader {...headerProps} />,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, navigation]);
}
