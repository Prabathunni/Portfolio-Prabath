// PLACEHOLDER: put your real number here, with the country code, exactly as it should be shown (e.g. "+91 98765 43210").
const phone = "+91 XXXXX XXXXX";

export const contact = {
  email: "prabathunni826@gmail.com",
  phone,
  // What the call buttons dial: the same number without the spaces.
  phoneHref: `tel:${phone.replace(/\s/g, "")}`,
  // PLACEHOLDER: swap /resume-placeholder.pdf for your real resume file in /public.
  resumeHref: "/resume-placeholder.pdf",
  // The name the file gets when someone downloads it from the contact dial.
  resumeFileName: "Prabath-Resume.pdf",
};
