"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, Check, Mail, Phone, Upload } from "lucide-react";
import { Heading } from "@/components/heading";
import { MobileChrome } from "@/components/mobile-chrome";
import { school } from "@/lib/school";

type CareerForm = {
  fullName: string;
  email: string;
  phone: string;
  role: string;
  message: string;
  resumeName: string;
};

const empty: CareerForm = {
  fullName: "",
  email: "",
  phone: "",
  role: "",
  message: "",
  resumeName: "",
};

const CAREER_PHONES = ["+91 99883 34844", "+91 99883 35466"];
const CAREER_EMAIL = "info@wellspireinternational.com";

export function CareersPage() {
  const [form, setForm] = useState<CareerForm>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof CareerForm, string>>>(
    {},
  );
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const setField = <K extends keyof CareerForm>(key: K, value: CareerForm[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const validate = (data: CareerForm) => {
    const next: Partial<Record<keyof CareerForm, string>> = {};
    if (!data.fullName.trim()) next.fullName = "Please enter your full name.";
    if (!data.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      next.email = "Please enter a valid email address.";
    }
    if (!data.phone.trim() || data.phone.replace(/\D/g, "").length < 10) {
      next.phone = "Please enter a valid phone number.";
    }
    if (!data.role.trim()) next.role = "Please tell us the role you are applying for.";
    if (!data.resumeName) next.resumeName = "Please upload your resume.";
    return next;
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const nextErrors = validate(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    setSubmitting(true);
    try {
      const payload = {
        ...form,
        fullName: form.fullName.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        role: form.role.trim(),
        message: form.message.trim(),
        savedAt: new Date().toISOString(),
      };
      localStorage.setItem("wellspire-career-application", JSON.stringify(payload));
      await new Promise((r) => setTimeout(r, 450));
      setSuccess(true);
    } catch {
      setErrors({
        resumeName:
          "Your browser could not save this application. Please allow local storage and retry.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <MobileChrome activeMatch="/careers">
      <div className="careers-page">
        <div className="careers-layout">
          <aside className="careers-intro">
            <p className="eyebrow">CAREERS</p>
            <Heading>
              Join hands in building
              <br />
              <em>bright futures.</em>
            </Heading>
            <p className="careers-deck">
              We offer an excellent work environment that encourages
              self-development, work-life balance, and professional growth. With
              competitive salaries, attractive benefits, and a peaceful campus
              atmosphere, we strive to provide a workplace that matches the
              highest standards in the education industry.
            </p>

            <div className="careers-contact">
              <p className="careers-contact-label">Apply directly</p>
              <ul className="careers-contact-list">
                {CAREER_PHONES.map((phone) => (
                  <li key={phone}>
                    <a href={`tel:${phone.replace(/\s/g, "")}`}>
                      <Phone size={15} strokeWidth={1.75} aria-hidden="true" />
                      <span>{phone}</span>
                    </a>
                  </li>
                ))}
                <li>
                  <a href={`mailto:${CAREER_EMAIL}`}>
                    <Mail size={15} strokeWidth={1.75} aria-hidden="true" />
                    <span>{CAREER_EMAIL}</span>
                  </a>
                </li>
              </ul>
              <p className="careers-contact-note">
                Shortlisted applicants will be contacted based on current
                openings.
              </p>
            </div>
          </aside>

          <section
            className="careers-form-card"
            aria-labelledby="careers-form-heading"
          >
            {success ? (
              <div className="careers-success" role="status">
                <span className="careers-success-icon" aria-hidden="true">
                  <Check size={28} strokeWidth={2} />
                </span>
                <h2>Application received</h2>
                <p>
                  Thank you for your interest in joining Wellspire. Our team will
                  review your details and contact shortlisted applicants.
                </p>
                <p className="careers-success-note">
                  Your application draft has been saved on this device. Online
                  submissions will open when the school connects its careers
                  service.
                </p>
              </div>
            ) : (
              <>
                <header className="careers-form-header">
                  <h2 id="careers-form-heading">Upload resume</h2>
                  <p className="careers-form-lead">
                    Share your details and resume. We will get in touch when a
                    matching opening is available.
                  </p>
                </header>

                <form className="careers-form" onSubmit={onSubmit} noValidate>
                  <div className="careers-form-row">
                    <label className="admissions-field">
                      <span>
                        Full name <em>*</em>
                      </span>
                      <input
                        type="text"
                        name="fullName"
                        autoComplete="name"
                        placeholder="Enter your full name"
                        maxLength={120}
                        value={form.fullName}
                        onChange={(e) => setField("fullName", e.target.value)}
                        aria-invalid={Boolean(errors.fullName)}
                        required
                      />
                      {errors.fullName && (
                        <span className="admissions-field-error" role="alert">
                          {errors.fullName}
                        </span>
                      )}
                    </label>

                    <label className="admissions-field">
                      <span>
                        Email address <em>*</em>
                      </span>
                      <input
                        type="email"
                        name="email"
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
                  </div>

                  <div className="careers-form-row">
                    <label className="admissions-field">
                      <span>
                        Phone number <em>*</em>
                      </span>
                      <input
                        type="tel"
                        name="phone"
                        autoComplete="tel"
                        inputMode="tel"
                        placeholder="+91 XXXXX XXXXX"
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
                        Role / position <em>*</em>
                      </span>
                      <input
                        type="text"
                        name="role"
                        placeholder="e.g. Primary Teacher, Admin"
                        maxLength={120}
                        value={form.role}
                        onChange={(e) => setField("role", e.target.value)}
                        aria-invalid={Boolean(errors.role)}
                        required
                      />
                      {errors.role && (
                        <span className="admissions-field-error" role="alert">
                          {errors.role}
                        </span>
                      )}
                    </label>
                  </div>

                  <label className="admissions-field">
                    <span>Cover note (optional)</span>
                    <textarea
                      name="message"
                      rows={3}
                      placeholder="Tell us briefly about your experience..."
                      maxLength={800}
                      value={form.message}
                      onChange={(e) => setField("message", e.target.value)}
                    />
                  </label>

                  <label className="careers-upload">
                    <span className="careers-upload-label">
                      Resume <em>*</em>
                    </span>
                    <span className="careers-upload-box">
                      <Upload size={18} strokeWidth={1.75} aria-hidden="true" />
                      <span>
                        {form.resumeName
                          ? form.resumeName
                          : "Upload PDF or DOC (max 5 MB)"}
                      </span>
                    </span>
                    <input
                      type="file"
                      name="resume"
                      accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (!file) {
                          setField("resumeName", "");
                          return;
                        }
                        if (file.size > 5 * 1024 * 1024) {
                          setErrors((prev) => ({
                            ...prev,
                            resumeName: "Please upload a file under 5 MB.",
                          }));
                          setField("resumeName", "");
                          return;
                        }
                        setField("resumeName", file.name);
                      }}
                      aria-invalid={Boolean(errors.resumeName)}
                      required
                    />
                    {errors.resumeName && (
                      <span className="admissions-field-error" role="alert">
                        {errors.resumeName}
                      </span>
                    )}
                  </label>

                  <button
                    className="careers-submit"
                    type="submit"
                    disabled={submitting}
                  >
                    {submitting ? "Sending…" : "Send application"}
                    {!submitting && (
                      <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
                    )}
                  </button>

                  <p className="careers-form-note">
                    Stored only in this browser until the school connects its
                    careers service. No information is transmitted yet.
                    {(school.city || school.phone) && (
                      <> Campus: {school.city || "Hyderabad"}.</>
                    )}
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
