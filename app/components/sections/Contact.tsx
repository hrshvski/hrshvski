"use client";

import type { Dictionary } from "@/app/[lang]/dictionaries";
import { useState } from "react";
import Icon from "../Icon";
import { Panel, PixelButton } from "../ui";

export default function Contact({ dict }: { dict: Dictionary }) {
  const { contact } = dict;
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <section id="контакт" className="border-t-4 border-black bg-[#e8e1cf] py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2">
          {/* Left */}
          <div className="space-y-4">
            <div className="text-xs font-black uppercase tracking-[0.3em] text-slate-700">
              {contact.eyebrow}
            </div>
            <h2 className="text-3xl font-black uppercase sm:text-4xl">
              {contact.heading}
            </h2>
            <p className="max-w-md text-sm leading-7 text-slate-700">
              {contact.text}
            </p>

            <div className="flex flex-col gap-3 pt-2">
              {[
                { icon: "mail", label: "office@hrshvski.com" },
                { icon: "phone", label: "+380 63 964 08 48" },
                { icon: "github", label: "http://localhost:3000/uk" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-3 text-sm font-bold"
                >
                  <div className="flex h-8 w-8 items-center justify-center border-2 border-black bg-lime-300">
                    <Icon name={item.icon} className="h-4 w-4" />
                  </div>
                  {item.label}
                </div>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <Panel className="p-6">
            {sent ? (
              <div className="flex flex-col items-center gap-4 py-8 text-center">
                <div className="flex h-16 w-16 items-center justify-center border-4 border-black bg-lime-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <Icon name="zap" className="h-8 w-8" />
                </div>
                <p className="text-lg font-black uppercase">
                  {contact.successTitle}
                </p>
                <p className="text-sm text-slate-700">{contact.successText}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {[
                  {
                    id: "name",
                    label: contact.nameLabel,
                    placeholder: contact.namePlaceholder,
                    type: "text",
                  },
                  {
                    id: "email",
                    label: contact.emailLabel,
                    placeholder: contact.emailPlaceholder,
                    type: "email",
                  },
                ].map(({ id, label, placeholder, type }) => (
                  <div key={id} className="space-y-1">
                    <label
                      htmlFor={id}
                      className="block text-xs font-black uppercase tracking-wider"
                    >
                      {label}
                    </label>
                    <input
                      id={id}
                      name={id}
                      type={type}
                      placeholder={placeholder}
                      required
                      className="w-full border-4 border-black px-3 py-2 text-sm font-medium outline-none focus:bg-lime-50 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                    />
                  </div>
                ))}

                <div className="space-y-1">
                  <label
                    htmlFor="message"
                    className="block text-xs font-black uppercase tracking-wider"
                  >
                    {contact.messageLabel}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    placeholder={contact.messagePlaceholder}
                    required
                    className="w-full border-4 border-black px-3 py-2 text-sm font-medium outline-none focus:bg-lime-50 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] resize-none"
                  />
                </div>

                <PixelButton>{contact.submit}</PixelButton>
              </form>
            )}
          </Panel>
        </div>
      </div>
    </section>
  );
}
