import React from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { useThemeConfig } from '@docusaurus/theme-common';
import AnimatedPhoenixLogo from '@site/src/components/AnimatedPhoenixLogo';

export default function NavbarLogo() {
  const { navbar: { logo } } = useThemeConfig();
  const logoLink = useBaseUrl(logo?.href || '/');

  return (
    <Link to={logoLink} className="navbar__brand" style={{ paddingLeft: '0.5rem' }}>
      <AnimatedPhoenixLogo size={28} />
    </Link>
  );
}
