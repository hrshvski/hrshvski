import type { Block } from "@/lib/types";

export default function PostBody({ blocks }: { blocks: Block[] }) {
  return (
    <div className="prose-site">
      {blocks.map((b, i) => {
        switch (b.type) {
          case "p":
            return <p key={i}>{b.text}</p>;
          case "h2":
            return <h2 key={i}>{b.text}</h2>;
          case "h3":
            return <h3 key={i}>{b.text}</h3>;
          case "ul":
            return (
              <ul key={i}>
                {b.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol key={i}>
                {b.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ol>
            );
          case "note":
            return (
              <aside key={i} className="rounded-md border-l-[3px] border-signal bg-signal-soft px-5 py-4 text-[16px]">
                {b.text}
              </aside>
            );
          case "table":
            return (
              <div key={i} className="overflow-x-auto rounded-lg border border-line bg-surface" style={{ maxWidth: "min(100%, 860px)" }}>
                <table className="w-full min-w-[600px] border-collapse text-left text-[14.5px] leading-[1.5]">
                  <thead>
                    <tr className="bg-sunken font-mono text-[11.5px] uppercase tracking-[0.06em] text-muted">
                      {b.head.map((h) => (
                        <th key={h} className="px-4 py-3 font-medium">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {b.rows.map((r, ri) => (
                      <tr key={ri} className="border-t border-line align-top">
                        {r.map((c, ci) => (
                          <td key={ci} className={`px-4 py-3 ${ci === 0 ? "font-semibold" : ""}`}>
                            {c}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
        }
      })}
    </div>
  );
}
