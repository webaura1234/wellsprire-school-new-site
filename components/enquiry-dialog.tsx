"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowUpRight, Check, X } from "lucide-react";
import { Heading } from "@/components/heading";
import {
  founderDialogCopy,
  programmeDialogCopy,
} from "@/lib/programmes";

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="eyebrow">{children}</p>;
}

export function useEnquiryDialog() {
  const [dialog, setDialog] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [draft, setDraft] = useState<Record<string, string>>({});
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (dialog) dialogRef.current?.showModal();
    else dialogRef.current?.close();
  }, [dialog]);

  useEffect(() => {
    document.body.style.overflow = dialog ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [dialog]);

  function openDialog(value: string) {
    setSaved(false);
    try {
      setDraft(JSON.parse(localStorage.getItem("wellspire-enquiry") || "{}"));
    } catch {
      setDraft({});
    }
    setDialog(value);
  }

  return { dialog, setDialog, saved, setSaved, draft, setDraft, dialogRef, openDialog };
}

export function EnquiryDialog({
  dialog,
  setDialog,
  saved,
  setSaved,
  draft,
  setDraft,
  dialogRef,
  openDialog,
}: ReturnType<typeof useEnquiryDialog>) {
  return (
    <dialog
      aria-label={dialog || "Wellspire information"}
      ref={dialogRef}
      className="enquiry-dialog"
      onCancel={() => setDialog(null)}
      onClick={(e) => {
        if (e.target === e.currentTarget) setDialog(null);
      }}
    >
      <button
        className="dialog-close"
        aria-label="Close dialog"
        onClick={() => setDialog(null)}
      >
        <X />
      </button>
      <Eyebrow>WELLSPIRE — LET’S TALK</Eyebrow>
      <Heading>{dialog}</Heading>
      {dialog?.includes("enquiry") || dialog?.includes("visit") ? (
        <>
          {saved ? (
            <div className="success" role="status">
              <Check size={32} />
              <h3>Your enquiry has been saved on this device.</h3>
              <p>
                This preview is not connected to the admissions office. Your
                details have not been sent. You can return and edit them below.
              </p>
              <button className="button" onClick={() => setSaved(false)}>
                Edit details <ArrowRight size={16} />
              </button>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const data = Object.fromEntries(new FormData(e.currentTarget));
                try {
                  localStorage.setItem(
                    "wellspire-enquiry",
                    JSON.stringify(data),
                  );
                  setDraft(data as Record<string, string>);
                  setSaved(true);
                } catch {
                  alert(
                    "Your browser could not save this enquiry. Please allow local storage and retry.",
                  );
                }
              }}
            >
              <p className="form-note">
                Save an enquiry draft. Online submissions will open when the
                school connects its admissions service.
              </p>
              <label>
                Parent or guardian’s name
                <input
                  name="name"
                  defaultValue={draft.name || ""}
                  autoComplete="name"
                  required
                  maxLength={100}
                />
              </label>
              <label>
                Phone number
                <input
                  name="phone"
                  defaultValue={draft.phone || ""}
                  type="tel"
                  autoComplete="tel"
                  pattern="[+0-9 ()-]{10,18}"
                  title="Enter a valid phone number, 10–18 characters"
                  required
                />
              </label>
              <div className="form-row">
                <label>
                  Class applying for
                  <select
                    name="class"
                    required
                    defaultValue={draft.class || ""}
                  >
                    <option value="" disabled>
                      Select class
                    </option>
                    {[
                      "Nursery",
                      "PP1",
                      "PP2",
                      ...Array.from({ length: 7 }, (_, i) => `Grade ${i + 1}`),
                    ].map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </label>
                <label>
                  City
                  <input
                    name="city"
                    defaultValue={draft.city || ""}
                    autoComplete="address-level2"
                    required
                    maxLength={100}
                  />
                </label>
              </div>
              <p className="form-note">
                Stored only in this browser. No information is transmitted.
              </p>
              <button className="button" type="submit">
                Save enquiry draft <ArrowUpRight size={16} />
              </button>
            </form>
          )}
        </>
      ) : (
        <div className="information-panel">
          {dialog === "Message from our Principal" ? (
            <>
              <p>
                At Wellspire, education is never about numbers—it is about
                each child. It is about their curiosity, courage, creativity,
                emotions, challenges, strengths, and dreams. We believe that
                every child has their own pace and purpose, and our role is
                to guide them with encouragement, understanding, and trust.
              </p>
              <p>
                With 15 years of experience in leading schools, shaping
                academics, and designing curriculum, I have seen firsthand
                that children flourish best when they feel safe, valued, and
                inspired. This belief lives at the heart of Wellspire.
              </p>
              <p>
                Our school spaces speak the language of care and purpose.
                Every classroom, every learning area, every open corner has
                been created to nurture the mind, body, and soul. Children
                walk into Wellspire with enthusiasm, confidence, and the
                freedom to express themselves.
              </p>
              <p>
                Through a curriculum that nurtures expression, creativity,
                emotional strength, physical fitness, and social awareness,
                supported by experiential and joyful learning, our children
                grow into balanced, compassionate, and confident
                individuals—ready for the world and for themselves.
              </p>
              <p>
                At Wellspire, we do not merely educate minds—we shape lives.
              </p>
            </>
          ) : (
            <>
              {(dialog && programmeDialogCopy[dialog]
                ? programmeDialogCopy[dialog]
                : dialog && founderDialogCopy[dialog]
                  ? founderDialogCopy[dialog]
                  : dialog === "Fee structure"
                    ? "The school’s approved, class-wise fee schedule has not yet been supplied. Tuition, transport, one-time charges, and payment dates must be confirmed in the official schedule."
                    : dialog === "Admissions guide"
                      ? "The admissions journey begins with an enquiry, followed by registration, an interaction, document checks, and confirmation. Opening dates, eligibility, and the official prospectus are awaiting approval from the school."
                      : dialog === "Privacy & your data"
                        ? "This preview uses browser storage only when you save an enquiry draft. It does not send the draft to a server or use analytics. Clear the saved draft below to remove your information from this device."
                        : "The name Wellspire reflects our belief that well-being and inspiration together create meaningful education. We nurture mind, body, and spirit through academics, values, creativity, communication, reading, and care."
              )
                .split("\n\n")
                .map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
            </>
          )}
          {dialog === "Privacy & your data" ? (
            <button
              className="button"
              onClick={() => {
                localStorage.removeItem("wellspire-enquiry");
                setSaved(true);
              }}
            >
              {saved ? "Saved draft removed" : "Remove saved enquiry draft"}
            </button>
          ) : (
            <button
              className="button"
              onClick={() => openDialog("Start an admissions enquiry")}
            >
              Start a conversation <ArrowUpRight size={16} />
            </button>
          )}
        </div>
      )}
    </dialog>
  );
}
