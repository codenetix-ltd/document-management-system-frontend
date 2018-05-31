import Loadable from 'react-loadable';
import React from 'react';

import SplashScreen from 'Components/common/SplashScreen';

export const Wrapper = Loadable({
  loader: () => import('Components/Wrapper'),
  loading() {
    return <SplashScreen />;
  }
});

export default {
  Wrapper
};
