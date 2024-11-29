import { useCookies } from 'react-cookie';

import { CustomButton } from '../Buttons/CustomButton';

const additionalGACookie = `_ga_${(process.env.NEXT_PUBLIC_GA_ID ?? '').slice(2)}`;

export function CookieConsentPopup() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setCookie, removeCookie] = useCookies(['cookie-consent', '_ga', additionalGACookie]);

  const setCookieConsent = (consented: boolean) => {
    const date = new Date();
    date.setFullYear(date.getFullYear() + 1);
    setCookie('cookie-consent', consented, { expires: date });
    if (!consented) {
      removeCookie('_ga');
      removeCookie(additionalGACookie);
    }
  };

  return (
    <div className="absolute bottom-4 left-1/2 p-4 items-center -translate-x-1/2 mx-auto rounded-md bg-content1 flex gap-2 justify-between z-cookieConsent w-full lg:w-2/5">
      <p>Allow use of cookies to track the traffic on the website?</p>
      <div className="flex gap-2">
        <CustomButton color="secondary" onClick={() => setCookieConsent(false)}>
          No
        </CustomButton>
        <CustomButton color="primary" onClick={() => setCookieConsent(true)}>
          Allow
        </CustomButton>
      </div>
    </div>
  );
}
