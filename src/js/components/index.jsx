import Loadable from 'react-loadable';
import React from 'react';

import SplashScreen from 'Components/common/SplashScreen';

export const Wrapper = Loadable({
  loader: () => import('Components/Wrapper'),
  loading() {
    return <SplashScreen />;
  }
});

export const Header = Loadable({
  loader: () => import('Components/Header'),
  loading() {
    return <SplashScreen />;
  }
});

export const Sidebar = Loadable({
  loader: () => import('Components/Sidebar'),
  loading() {
    return <SplashScreen />;
  }
});

export const Content = Loadable({
  loader: () => import('Components/Content'),
  loading() {
    return <SplashScreen />;
  }
});

export const Footer = Loadable({
  loader: () => import('Components/Footer'),
  loading() {
    return <SplashScreen />;
  }
});

export default {
  Wrapper,
  Header
};
