import NextImage from 'next/image';

export function LogoWithText() {
  return (
    <div className="flex items-center gap-2">
      <NextImage src="/wfp_logo.svg" alt="HungerMap" width={45} height={45} />
      <p className="font-bold text-lg">
        HungerMap <sup>LIVE</sup>
      </p>
    </div>
  );
}
