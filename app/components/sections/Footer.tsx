import type { Dictionary } from "@/app/[lang]/dictionaries";

export default function Footer({ dict }: { dict: Dictionary }) {
  const { footer } = dict;

  return (
    <footer className="mx-auto flex max-w-[1240px] flex-col gap-2 px-5 py-[26px] text-[11px] text-[#565b66] sm:flex-row sm:justify-between sm:px-10">
      <span>© {new Date().getFullYear()} {footer.copyright}</span>
      <span>hrshvski.com</span>
    </footer>
  );
}
