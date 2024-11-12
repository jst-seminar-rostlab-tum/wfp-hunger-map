import NextImage from 'next/image';
import NextLink from 'next/link';

export function LogoWithText() {
  return (
    <NextLink href="/">
      <div className="flex items-center gap-2">
        <NextImage src="/wfp_logo.svg" alt="HungerMap" width={45} height={45} />
        <p className="font-bold text-lg">
          HungerMap <sup>LIVE</sup>
        </p>
      </div>
    </NextLink>
  );
}
