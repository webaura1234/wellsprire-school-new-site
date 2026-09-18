"use client";

import { useEffect, useState, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  ChevronRight,
  GraduationCap,
  MapPin,
  Menu,
  Phone,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";
import { Brand } from "@/components/brand";
import { Heading } from "@/components/heading";
import { photos } from "@/lib/content";
import { mobileNavItems } from "@/lib/mobile-nav";
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
  const [menu, setMenu] = useState(false);
  const [form, setForm] = useState<FormState>(empty);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const years = academicYears();

  useEffect(() => {
    document.body.style.overflow = menu ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menu]);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 768px)");
    const bounce = () => {
      if (desktop.matches) {
        window.location.replace("/#admissions");
      }
    };
    bounce();
    desktop.addEventListener("change", bounce);
    return () => desktop.removeEventListener("change", bounce);
  }, []);

  useEffect(() => {
    if (!menu) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenu(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menu]);

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
    <div className="admissions-mobile-page">
      <header className={`header admissions-mobile-header ${menu ? "is-menu-open" : ""}`}>
        <div className="header-brand-group">
          <Brand />
        </div>
        <Link
          className="mobile-admissions-btn is-active"
          href="/admissions"
          aria-current="page"
        >
          Admissions
          <ChevronRight size={14} strokeWidth={2.2} aria-hidden="true" />
        </Link>
        <button
          className="menu-toggle"
          type="button"
          onClick={() => setMenu(!menu)}
          aria-expanded={menu}
          aria-controls="admissions-mobile-navigation"
          aria-label={menu ? "Close menu" : "Open menu"}
        >
          {menu ? (
            <X size={20} strokeWidth={1.75} aria-hidden="true" />
          ) : (
            <Menu size={20} strokeWidth={1.75} aria-hidden="true" />
          )}
        </button>
      </header>

      <AnimatePresence>
        {menu && (
          <motion.div
            id="admissions-mobile-navigation"
            className="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          >
            <nav className="mobile-menu-nav" aria-label="Mobile navigation">
              {mobileNavItems.map(({ label, href, Icon }) => {
                const isActive = href === "/admissions";
                return (
                  <Link
                    key={label}
                    href={href}
                    className={`mobile-menu-link${isActive ? " is-active" : ""}`}
                    aria-current={isActive ? "page" : undefined}
                    onClick={() => setMenu(false)}
                  >
                    <span className="mobile-menu-link-icon" aria-hidden="true">
                      <Icon size={20} strokeWidth={1.5} />
                    </span>
                    <span className="mobile-menu-link-label">{label}</span>
                    <ChevronRight
                      className="mobile-menu-link-chevron"
                      size={16}
                      strokeWidth={1.75}
                      aria-hidden="true"
                    />
                  </Link>
                );
              })}
            </nav>
            <div className="mobile-menu-ctas">
              <Link
                className="mobile-menu-cta mobile-menu-cta--primary"
                href="/admissions"
                onClick={() => setMenu(false)}
              >
                Apply for Admissions
                <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
              </Link>
              <Link
                className="mobile-menu-cta mobile-menu-cta--secondary"
                href="/#admissions"
                onClick={() => setMenu(false)}
              >
                Back to home admissions
                <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
              </Link>
            </div>
            {(school.city || school.phone) && (
              <div className="mobile-menu-contact">
                {school.city && (
                  <p>
                    <MapPin size={15} strokeWidth={1.6} aria-hidden="true" />
                    <span>{school.city}</span>
                  </p>
                )}
                {school.phone && (
                  <a href={`tel:${school.phone.replace(/\s/g, "")}`}>
                    <Phone size={15} strokeWidth={1.6} aria-hidden="true" />
                    <span>{school.phone}</span>
                  </a>
                )}
              </div>
            )}
            <p className="mobile-menu-tagline">LEARN · GROW · BELONG</p>
          </motion.div>
        )}
      </AnimatePresence>

      <main id="main" className="admissions-mobile-main">
        <section className="admissions-mobile-intro">
          <p className="eyebrow">ADMISSIONS</p>
          <Heading as="h1">
            Open for a
            <br />
            <em>Brighter Tomorrow</em>
          </Heading>
          <p className="admissions-mobile-deck">
            Begin your child&apos;s journey at Wellspire — where learning goes
            beyond the classroom.
          </p>
        </section>

        <div className="admissions-mobile-media">
          <Image
            src={photos.campus}
            alt="Wellspire International School campus"
            fill
            sizes="(max-width:767px) 92vw, 640px"
            priority
            className="admissions-mobile-photo"
          />
        </div>

        <ul className="admissions-mobile-benefits">
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

        <section className="admissions-mobile-form-card" aria-labelledby="enquiry-heading">
          {success ? (
            <div className="admissions-mobile-success" role="status">
              <span className="admissions-mobile-success-icon" aria-hidden="true">
                <Check size={28} strokeWidth={2} />
              </span>
              <h2>Enquiry Received</h2>
              <p>
                Thank you for your interest in Wellspire International School.
                Our admissions team will be in touch with you shortly.
              </p>
              <p className="admissions-mobile-success-note">
                Your enquiry draft has been saved on this device. Online
                submissions will open when the school connects its admissions
                service.
              </p>
              <Link className="admissions-mobile-submit" href="/">
                Back to Home
                <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
              </Link>
            </div>
          ) : (
            <>
              <h2 id="enquiry-heading">Enquiry Form</h2>
              <p className="admissions-mobile-form-lead">
                Share a few details and our admissions team will get in touch
                with you shortly.
              </p>

              <form className="admissions-mobile-form" onSubmit={onSubmit} noValidate>
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
                  <span>
                    I agree to be contacted by Wellspire International School.
                  </span>
                </label>
                {errors.consent && (
                  <span className="admissions-field-error" role="alert">
                    {errors.consent}
                  </span>
                )}

                <button
                  className="admissions-mobile-submit"
                  type="submit"
                  disabled={submitting}
                >
                  {submitting ? "Submitting…" : "Submit Enquiry"}
                  {!submitting && (
                    <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
                  )}
                </button>

                <p className="admissions-mobile-form-note">
                  Stored only in this browser until the school connects its
                  admissions service. No information is transmitted yet.
                </p>
              </form>
            </>
          )}
        </section>

        {(school.city || school.phone) && (
          <aside className="admissions-mobile-help">
            <h2>Need Assistance?</h2>
            <p>Our admissions team is here to help.</p>
            <div className="admissions-mobile-help-card">
              {school.city && (
                <p>
                  <MapPin size={15} strokeWidth={1.6} aria-hidden="true" />
                  <span>{school.city}</span>
                </p>
              )}
              {school.phone && (
                <a href={`tel:${school.phone.replace(/\s/g, "")}`}>
                  <Phone size={15} strokeWidth={1.6} aria-hidden="true" />
                  <span>{school.phone}</span>
                </a>
              )}
            </div>
          </aside>
        )}
      </main>
    </div>
  );
}
