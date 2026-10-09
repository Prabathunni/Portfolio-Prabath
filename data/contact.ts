// The number as it is shown and copied; the dial link below strips the spaces.
const phone = "+91 90482 47225";
const githubHandle = "Prabathunni";

export const contact = {
  email: "prabathunni826@gmail.com",
  phone,
  // What the call buttons dial: the same number without the spaces.
  phoneHref: `tel:${phone.replace(/\s/g, "")}`,
  // The hero shows the handle; the hero link and the footer tile both open the profile.
  githubHandle,
  github: `https://github.com/${githubHandle}`,
  // Must match the filename in /public exactly: Cloudflare paths are case-sensitive.
  // Opens in a new tab; the browser's PDF viewer has its own download button.
  resumeHref: "/Prabath-resume.pdf",
};
