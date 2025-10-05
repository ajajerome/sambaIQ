// Premium Icon System - Custom Icons
import React from 'react';
import Svg, { Path, Circle, Rect } from 'react-native-svg';

interface PremiumIconProps {
  size?: number;
  color?: string;
}

// Home Icon - Minimal & Premium
export const HomeIcon: React.FC<PremiumIconProps> = ({ size = 24, color = '#FFD700' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M3 12L5 10M5 10L12 3L19 10M5 10V20C5 20.5523 5.44772 21 6 21H9M19 10L21 12M19 10V20C19 20.5523 18.5523 21 18 21H15M9 21C9.55228 21 10 20.5523 10 20V16C10 15.4477 10.4477 15 11 15H13C13.5523 15 14 15.4477 14 16V20C14 20.5523 14.4477 21 15 21M9 21H15"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// Football Icon - Custom Design
export const FootballIcon: React.FC<PremiumIconProps> = ({ size = 24, color = '#FFD700' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2"/>
    <Path
      d="M8 8L12 4L16 8L14 12L12 16L10 12L8 8Z"
      fill={color}
      fillOpacity="0.2"
    />
    <Path
      d="M12 4L16 8M16 8L14 12M14 12L12 16M12 16L10 12M10 12L8 8M8 8L12 4"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// Profile Icon - Elegant
export const ProfileIcon: React.FC<PremiumIconProps> = ({ size = 24, color = '#FFD700' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Circle cx="12" cy="7" r="4" stroke={color} strokeWidth="2"/>
  </Svg>
);

// Friends Icon - Community Feel
export const FriendsIcon: React.FC<PremiumIconProps> = ({ size = 24, color = '#FFD700' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Circle cx="9" cy="7" r="4" stroke={color} strokeWidth="2"/>
    <Path
      d="M23 21V19C23 18.1645 22.7155 17.3551 22.2094 16.7006C21.7033 16.0461 20.9982 15.5833 20.2 15.3847"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M16 3.13C16.8003 3.32715 17.5056 3.78917 18.0118 4.44329C18.518 5.09741 18.8027 5.90674 18.8027 6.74196C18.8027 7.57718 18.518 8.38651 18.0118 9.04063C17.5056 9.69475 16.8003 10.1568 16 10.354"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// Trophy Icon - Achievement
export const TrophyIcon: React.FC<PremiumIconProps> = ({ size = 24, color = '#FFD700' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M6 9C6 10.6569 7.34315 12 9 12C10.6569 12 12 10.6569 12 9C12 7.34315 10.6569 6 9 6C7.34315 6 6 7.34315 6 9Z"
      fill={color}
      fillOpacity="0.2"
    />
    <Path
      d="M8 21L12 17L16 21M12 17V12M8 9C8 5.68629 10.6863 3 14 3H18C19.1046 3 20 3.89543 20 5V7C20 8.10457 19.1046 9 18 9H14M8 9C8 10.1046 8.89543 11 10 11H14M8 9H6C4.89543 9 4 8.10457 4 7V5C4 3.89543 4.89543 3 6 3H10C11.3137 3 12 5.68629 12 9"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// Star Icon - Premium Feel
export const StarIcon: React.FC<PremiumIconProps> = ({ size = 24, color = '#FFD700' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M11.0489 2.927C11.3483 2.00607 12.6517 2.00607 12.9511 2.927L14.4697 7.60081C14.6035 8.01284 14.9875 8.29374 15.4207 8.29374H20.335C21.3037 8.29374 21.7065 9.53647 20.9228 10.1008L17.0077 12.9894C16.6506 13.2441 16.5015 13.6954 16.6353 14.1074L18.1539 18.7812C18.4533 19.7021 17.4075 20.4686 16.6238 19.9043L12.7087 17.0157C12.3516 16.761 11.6484 16.761 11.2913 17.0157L7.37616 19.9043C6.59253 20.4686 5.54665 19.7021 5.84606 18.7812L7.36471 14.1074C7.49845 13.6954 7.34938 13.2441 6.99227 12.9894L3.07718 10.1008C2.29355 9.53647 2.69632 8.29374 3.66499 8.29374H8.57925C9.01252 8.29374 9.39647 8.01284 9.53022 7.60081L11.0489 2.927Z"
      fill={color}
    />
  </Svg>
);