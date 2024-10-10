import type { ComponentType, JSX } from 'react';

import Home from '@/pages/Home';
import Leaderboard from '@/pages/Leaderboard';
import Play from '@/pages/Play/index';
import Earn from '@/pages/Earn';
import Friends from '@/pages/Friends';
import Boost from '@/pages/Boost';
import Referral from '@/pages/Referral';

interface Route {
  path: string;
  Component: ComponentType;
  title?: string;
  icon?: JSX.Element;
}

export const routes: Route[] = [
  { path: '/', Component: Home },
  { path: '/leaderboard', Component: Leaderboard },
  { path: '/play', Component: Play },
  { path: '/earn', Component: Earn },
  { path: '/friends', Component: Friends },
  { path: '/boost', Component: Boost },
  { path: 'referral', Component: Referral }
];
