import { Fragment } from "react";

/**
 * The system we build, drawn as a pipeline: input → processing → output.
 * Horizontal when its container is wide enough, vertical otherwise.
 */
export default function Flow({
  nodes,
  caption,
  size = "md",
}: {
  nodes: string[];
  caption?: string;
  size?: "md" | "lg";
}) {
  const last = nodes.length - 1;
  const pad = size === "lg" ? "px-4 py-3.5 text-[14.5px]" : "px-3 py-2.5 text-[13.5px]";
  return (
    <figure className="@container rounded-lg border border-line bg-surface p-4 sm:p-5">
      <div className="flex flex-col items-stretch @2xl:flex-row @2xl:items-center">
        {nodes.map((n, i) => (
          <Fragment key={i}>
            <div
              className={`relative flex-1 rounded-md border font-mono leading-snug ${pad} ${
                i === 0
                  ? "border-line-strong bg-sunken text-ink"
                  : i === last
                    ? "border-accent bg-accent-soft text-accent"
                    : "border-line-strong bg-surface text-ink"
              }`}
            >
              <span className="mb-1 block text-[10.5px] uppercase tracking-[0.1em] text-muted">
                {i === 0 ? "in" : i === last ? "out" : `step ${i}`}
              </span>
              {n}
            </div>
            {i < last && (
              <div
                aria-hidden
                className="flow-wire ml-6 h-5 w-px flex-none bg-line-strong @2xl:ml-0 @2xl:h-px @2xl:w-6"
              />
            )}
          </Fragment>
        ))}
      </div>
      {caption && (
        <figcaption className="mt-3 font-mono text-[11.5px] text-muted">{caption}</figcaption>
      )}
    </figure>
  );
}
