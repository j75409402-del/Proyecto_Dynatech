import { ImageOff } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  label?: string;
  className?: string;
  iconClassName?: string;
};

/** Placeholder consistente pa' donde va una foto real que el cliente reemplaza después. */
export function ImagePlaceholder({ label = "Imagen a reemplazar", className, iconClassName }: Props) {
  return (
    <div
      className={cn(
        "flex h-full w-full flex-col items-center justify-center gap-2 bg-carbon-800 text-steel-500",
        className,
      )}
    >
      <ImageOff className={cn("h-7 w-7", iconClassName)} strokeWidth={1.25} />
      <span className="font-mono text-[9px] uppercase tracking-techno text-center px-2">{label}</span>
    </div>
  );
}
