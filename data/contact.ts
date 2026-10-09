// PLACEHOLDER: put your real number here, with the country code, exactly as it should be shown (e.g. "+91 98765 43210").
const phone = "+91 XXXXX XXXXX";
const githubHandle = "Prabathunni";

export const contact = {
  email: "prabathunni826@gmail.com",
  phone,
  // What the call buttons dial: the same number without the spaces.
  phoneHref: `tel:${phone.replace(/\s/g, "")}`,
  // The hero shows the handle; the hero link and the footer tile both open the profile.
  githubHandle,
  github: `https://github.com/${githubHandle}`,
  // PLACEHOLDER: swap /resume-placeholder.pdf for your real resume file in /public.
  // Opens in a new tab; the browser's PDF viewer has its own download button.
  resumeHref: "/resume-placeholder.pdf",
};
