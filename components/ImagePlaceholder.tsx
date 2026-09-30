import Image from "next/image";

type ImagePlaceholderProps = {
  ratio?: string; // CSS aspect-ratio value, e.g. "4/5", "16/10", "1/1"
  label?: string;
  className?: string;
  bordered?: boolean;
  src?: string; // when provided, renders the real photo instead of the placeholder pattern
  alt?: string;
  priority?: boolean;
};

// CSS-only stand-in for a real photo, or the real photo itself once `src` is
// supplied — same frame/border so sections don't need to change layout code
// when real photography replaces a placeholder.
export default function ImagePlaceholder({
  ratio = "4/5",
  label = "Image placeholder",
  className = "",
  bordered = true,
  src,
  alt = "",
  priority = false,
}: ImagePlaceholderProps) {
  return (
    <div
      className={`relative overflow-hidden bg-bg ${bordered ? "border border-line" : ""} ${className}`}
      style={{ aspectRatio: ratio }}
    >
      {src ? (
        <Image src={src} alt={alt} fill priority={priority} className="object-cover" />
      ) : (
        <>
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                "repeating-linear-gradient(135deg, transparent, transparent 10px, rgba(255,255,255,0.06) 10px, rgba(255,255,255,0.06) 11px)",
            }}
          />
          <span className="absolute bottom-3 left-3 text-[11px] uppercase tracking-widest text-muted">
            {label}
          </span>
        </>
      )}
    </div>
  );
}
