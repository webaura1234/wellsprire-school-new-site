"use client";

import { useEffect, useState, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  GraduationCap,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Heading } from "@/components/heading";
import { MobileChrome } from "@/components/mobile-chrome";
import { photos } from "@/lib/content";
import { school } from "@/lib/school";

const GRADES = [
  "Nursery",
  "PP1",
  "PP2",
  ...Array.from({ length: 7 }, (_, i) => `Grade ${i + 1}`),
] as const;

function academicYears() {
  const now = new Date();
  const start = now.getMonth() >= 3 ? now.getFullYear() : now.getFullYear() - 1;
  return [
    `${start}–${String(start + 1).slice(-2)}`,
    `${start + 1}–${String(start + 2).slice(-2)}`,
  ];
}

const benefits = [
  { n: "01", title: "Holistic Education", Icon: Sparkles },
  { n: "02", title: "Safe & Nurturing Environment", Icon: ShieldCheck },
  { n: "03", title: "World-ready Learners", Icon: GraduationCap },
] as const;

type FormState = {
  parentName: string;
  phone: string;
  email: string;
  childName: string;
  dob: string;
  grade: string;
  year: string;
  queries: string;
  consent: boolean;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const empty: FormState = {
  parentName: "",
  phone: "",
  email: "",
  childName: "",
  dob: "",
  grade: "",
  year: "",
  queries: "",
  consent: false,
};

function validate(form: FormState): FormErrors {
  const errors: FormErrors = {};
  if (!form.parentName.trim() || form.parentName.trim().length < 2) {
    errors.parentName = "Please enter the parent's full name.";
  }
  if (!/^[+0-9 ()-]{10,18}$/.test(form.phone.trim())) {
    errors.phone = "Enter a valid phone number (10–18 digits).";
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
    errors.email = "Enter a valid email address.";
  }
  if (!form.childName.trim() || form.childName.trim().length < 2) {
    errors.childName = "Please enter the child's name.";
  }
  if (!form.dob) {
    errors.dob = "Please select a date of birth.";
  } else {
    const dob = new Date(form.dob);
    if (Number.isNaN(dob.getTime()) || dob >= new Date()) {
      errors.dob = "Please enter a valid date of birth.";
    }
  }
  if (!form.grade) errors.grade = "Please select a grade.";
  if (!form.year) errors.year = "Please select an academic year.";
  if (!form.consent) {
    errors.consent = "Please agree to be contacted to continue.";
  }
  return errors;
}

export default function AdmissionsMobilePage() {
  const [form, setForm] = useState<FormState>(empty);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const years = academicYears();

  useEffect(() => {
    try {
      const raw = localStorage.getItem("wellspire-enquiry");
      if (!raw) return;
      const saved = JSON.parse(raw) as Record<string, string>;
      setForm((prev) => ({
        ...prev,
        parentName: saved.parentName || saved.name || "",
        phone: saved.phone || "",
        email: saved.email || "",
        childName: saved.childName || "",
        dob: saved.dob || "",
        grade: saved.grade || saved.class || "",
        year: saved.year || "",
        queries: saved.queries || "",
      }));
    } catch {
      /* ignore corrupt draft */
    }
  }, []);

  const setField = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const nextErrors = validate(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    setSubmitting(true);
    try {
      const payload = {
        parentName: form.parentName.trim(),
        name: form.parentName.trim(),
        phone: form.phone.trim(),
        email: form.email.trim(),
        childName: form.childName.trim(),
        dob: form.dob,
        grade: form.grade,
        class: form.grade,
        year: form.year,
        queries: form.queries.trim(),
        consent: "yes",
        savedAt: new Date().toISOString(),
      };
      localStorage.setItem("wellspire-enquiry", JSON.stringify(payload));
      await new Promise((r) => setTimeout(r, 450));
      setSuccess(true);
    } catch {
      setErrors({
        consent:
          "Your browser could not save this enquiry. Please allow local storage and retry.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <MobileChrome admissionsActive activeMatch="/admissions">
      <div className="admissions-page">
        <div className="admissions-layout">
          <aside className="admissions-intro">
            <p className="eyebrow">ADMISSIONS</p>
            <Heading as="h1">
              Open for a
              <br />
              <em>Brighter Tomorrow</em>
            </Heading>
            <p className="admissions-deck">
              Begin your child&apos;s journey at Wellspire — where learning goes
              beyond the classroom.
            </p>

            <div className="admissions-media">
              <Image
                src={photos.campus}
                alt="Wellspire School campus"
                fill
                sizes="(max-width:959px) 92vw, 520px"
                className="admissions-photo"
                priority
              />
            </div>

            <ul className="admissions-benefits">
              {benefits.map(({ n, title, Icon }) => (
                <li key={n}>
                  <span className="admissions-benefit-num">{n}</span>
                  <span className="admissions-benefit-icon" aria-hidden="true">
                    <Icon size={18} strokeWidth={1.6} />
                  </span>
                  <span className="admissions-benefit-title">{title}</span>
                </li>
              ))}
            </ul>

            {(school.city || school.phone) && (
              <div className="admissions-help">
                <p className="admissions-help-label">Need assistance?</p>
                <ul className="admissions-help-list">
                  {school.city && (
                    <li>
                      <span>
                        <MapPin size={15} strokeWidth={1.75} aria-hidden="true" />
                        <span>{school.city}</span>
                      </span>
                    </li>
                  )}
                  {school.phone && (
                    <li>
                      <a href={`tel:${school.phone.replace(/\s/g, "")}`}>
                        <Phone size={15} strokeWidth={1.75} aria-hidden="true" />
                        <span>{school.phone}</span>
                      </a>
                    </li>
                  )}
                </ul>
                <p className="admissions-help-note">
                  Our admissions team is here to help with enquiries and campus
                  visits.
                </p>
              </div>
            )}
          </aside>

          <section
            className="admissions-form-card"
            aria-labelledby="enquiry-heading"
          >
            {success ? (
              <div className="admissions-success" role="status">
                <span className="admissions-success-icon" aria-hidden="true">
                  <Check size={28} strokeWidth={2} />
                </span>
                <h2>Enquiry Received</h2>
                <p>
                  Thank you for your interest in Wellspire School. Our
                  admissions team will be in touch with you shortly.
                </p>
                <p className="admissions-success-note">
                  Your enquiry draft has been saved on this device. Online
                  submissions will open when the school connects its admissions
                  service.
                </p>
                <Link className="admissions-submit" href="/">
                  Back to Home
                  <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
                </Link>
              </div>
            ) : (
              <>
                <header className="admissions-form-header">
                  <h2 id="enquiry-heading">Enquiry Form</h2>
                  <p className="admissions-form-lead">
                    Share a few details and our admissions team will get in
                    touch with you shortly.
                  </p>
                </header>

                <form className="admissions-form" onSubmit={onSubmit} noValidate>
                  <div className="admissions-form-row">
                    <label className="admissions-field">
                      <span>
                        Parent&apos;s Full Name <em>*</em>
                      </span>
                      <input
                        name="parentName"
                        type="text"
                        autoComplete="name"
                        placeholder="Enter your full name"
                        maxLength={100}
                        value={form.parentName}
                        onChange={(e) => setField("parentName", e.target.value)}
                        aria-invalid={Boolean(errors.parentName)}
                        required
                      />
                      {errors.parentName && (
                        <span className="admissions-field-error" role="alert">
                          {errors.parentName}
                        </span>
                      )}
                    </label>

                    <label className="admissions-field">
                      <span>
                        Phone Number <em>*</em>
                      </span>
                      <input
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        placeholder="+91 XXXXX XXXXX"
                        inputMode="tel"
                        value={form.phone}
                        onChange={(e) => setField("phone", e.target.value)}
                        aria-invalid={Boolean(errors.phone)}
                        required
                      />
                      {errors.phone && (
                        <span className="admissions-field-error" role="alert">
                          {errors.phone}
                        </span>
                      )}
                    </label>
                  </div>

                  <div className="admissions-form-row">
                    <label className="admissions-field">
                      <span>
                        Email Address <em>*</em>
                      </span>
                      <input
                        name="email"
                        type="email"
                        autoComplete="email"
                        placeholder="Enter your email"
                        value={form.email}
                        onChange={(e) => setField("email", e.target.value)}
                        aria-invalid={Boolean(errors.email)}
                        required
                      />
                      {errors.email && (
                        <span className="admissions-field-error" role="alert">
                          {errors.email}
                        </span>
                      )}
                    </label>

                    <label className="admissions-field">
                      <span>
                        Child&apos;s Name <em>*</em>
                      </span>
                      <input
                        name="childName"
                        type="text"
                        autoComplete="off"
                        placeholder="Enter child's name"
                        maxLength={100}
                        value={form.childName}
                        onChange={(e) => setField("childName", e.target.value)}
                        aria-invalid={Boolean(errors.childName)}
                        required
                      />
                      {errors.childName && (
                        <span className="admissions-field-error" role="alert">
                          {errors.childName}
                        </span>
                      )}
                    </label>
                  </div>

                  <label className="admissions-field">
                    <span>
                      Date of Birth <em>*</em>
                    </span>
                    <input
                      name="dob"
                      type="date"
                      value={form.dob}
                      onChange={(e) => setField("dob", e.target.value)}
                      aria-invalid={Boolean(errors.dob)}
                      required
                    />
                    {errors.dob && (
                      <span className="admissions-field-error" role="alert">
                        {errors.dob}
                      </span>
                    )}
                  </label>

                  <div className="admissions-form-row">
                    <label className="admissions-field">
                      <span>
                        Grade Applying For <em>*</em>
                      </span>
                      <select
                        name="grade"
                        value={form.grade}
                        onChange={(e) => setField("grade", e.target.value)}
                        aria-invalid={Boolean(errors.grade)}
                        required
                      >
                        <option value="" disabled>
                          Select Grade
                        </option>
                        {GRADES.map((g) => (
                          <option key={g} value={g}>
                            {g}
                          </option>
                        ))}
                      </select>
                      {errors.grade && (
                        <span className="admissions-field-error" role="alert">
                          {errors.grade}
                        </span>
                      )}
                    </label>

                    <label className="admissions-field">
                      <span>
                        Academic Year <em>*</em>
                      </span>
                      <select
                        name="year"
                        value={form.year}
                        onChange={(e) => setField("year", e.target.value)}
                        aria-invalid={Boolean(errors.year)}
                        required
                      >
                        <option value="" disabled>
                          Select Year
                        </option>
                        {years.map((y) => (
                          <option key={y} value={y}>
                            {y}
                          </option>
                        ))}
                      </select>
                      {errors.year && (
                        <span className="admissions-field-error" role="alert">
                          {errors.year}
                        </span>
                      )}
                    </label>
                  </div>

                  <label className="admissions-field">
                    <span>Specific Queries (Optional)</span>
                    <textarea
                      name="queries"
                      rows={4}
                      placeholder="Tell us how we can help..."
                      maxLength={800}
                      value={form.queries}
                      onChange={(e) => setField("queries", e.target.value)}
                    />
                  </label>

                  <label className="admissions-consent">
                    <input
                      type="checkbox"
                      checked={form.consent}
                      onChange={(e) => setField("consent", e.target.checked)}
                      aria-invalid={Boolean(errors.consent)}
                    />
                    <span>I agree to be contacted by Wellspire School.</span>
                  </label>
                  {errors.consent && (
                    <span className="admissions-field-error" role="alert">
                      {errors.consent}
                    </span>
                  )}

                  <button
                    className="admissions-submit"
                    type="submit"
                    disabled={submitting}
                  >
                    {submitting ? "Submitting…" : "Submit Enquiry"}
                    {!submitting && (
                      <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
                    )}
                  </button>

                  <p className="admissions-form-note">
                    Stored only in this browser until the school connects its
                    admissions service. No information is transmitted yet.
                  </p>
                </form>
              </>
            )}
          </section>
        </div>
      </div>
    </MobileChrome>
  );
}
