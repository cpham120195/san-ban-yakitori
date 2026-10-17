"use client";

import { FormEvent, useEffect, useState } from "react";
import { Check, AlertCircle, ArrowRight } from "lucide-react";
import { experiences, skewerOptions } from "../data/menu";
import { phonePattern, phoneValidationMessage } from "../lib/phone";

function getTodayString() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export default function InquiryForm() {
  const emptyForm = {
    name: "",
    email: "",
    phone: "",
    eventDate: "",
    eventLocation: "",
    guestCount: "",
    preferredPackage: "",
    eventType: "",
    message: "",
  };

  const [form, setForm] = useState({
    ...emptyForm,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [contactErrors, setContactErrors] = useState<Record<string, string>>({});

  function handleContactInvalid(event: FormEvent<HTMLInputElement>) {
    event.preventDefault();
    const input = event.currentTarget;
    const missingMessages: Record<string, string> = {
      name: "Please fill out your name",
      email: "Please fill out your email",
      phone: "Please fill out your phone number",
      eventDate: "Please select your event date",
      eventLocation: "Please fill out your location or city",
      guestCount: "Please fill out your estimated guest count",
    };
    const message = input.name === "eventDate" && input.validity.badInput
      ? "Please enter a valid event date"
      : input.validity.valueMissing
      ? missingMessages[input.name]
      : input.name === "eventDate"
        ? "Please select today or a future date"
        : input.name === "phone"
        ? phoneValidationMessage
        : "Please enter a valid email address, like name@example.com";
    setContactErrors((previous) => ({ ...previous, [input.name]: message }));
    if (input.form?.querySelector(":invalid") === input) {
      input.focus();
    }
  }


  const [status, setStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({
    type: null,
    message: "",
  });

  useEffect(() => {
    function handleExperienceSelect(event: Event) {
      const selectedExperience = (event as CustomEvent<string>).detail;

      if (!selectedExperience) {
        return;
      }

      setForm((prev) => ({
        ...prev,
        preferredPackage: selectedExperience,
      }));
    }

    window.addEventListener("sanban:select-experience", handleExperienceSelect);

    return () => {
      window.removeEventListener("sanban:select-experience", handleExperienceSelect);
    };
  }, []);

  function updateField(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;

    if (name === "eventDate") {
      setContactErrors((previous) => ({
        ...previous,
        eventDate: value && value < getTodayString()
          ? "Please select today or a future date"
          : "",
      }));
    }

    setStatus({ type: null, message: "" });

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: null, message: "" });

    const today = getTodayString();

    if (form.eventDate && form.eventDate < today) {
      setContactErrors((previous) => ({
        ...previous,
        eventDate: "Please select today or a future date",
      }));
      (e.currentTarget.elements.namedItem("eventDate") as HTMLInputElement)?.focus();
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong.");
      }

      setStatus({
        type: "success",
        message: "Thank you for your interest in San Bạn Yakitori. We’ve received your inquiry and will get back to you shortly.",
      });

      setForm(emptyForm);
      setContactErrors({});

    } catch (error) {
      setStatus({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Something went wrong while sending your inquiry.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  if (status.type === "success") {
    return (
      <div className="rounded-lg border border-white/10 bg-white/[0.035] p-6 text-center shadow-2xl shadow-black/40 sm:p-8">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/[0.04] text-white">
          <Check size={20} />
        </div>

        <h3 className="mt-5 text-2xl font-semibold text-white">
          Inquiry Received
        </h3>

        <p className="mx-auto mt-4 max-w-md text-base leading-7 text-stone-300">
          Thank you for your interest in San Bạn Yakitori. We&apos;ll get back
          to you shortly with availability and next steps.
        </p>

        <button
          type="button"
          onClick={() => {
            setStatus({ type: null, message: "" });
            setForm(emptyForm);
      setContactErrors({});
          }}
          className="mt-7 inline-flex min-h-12 items-center justify-center rounded-full border border-white/35 px-7 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-white transition hover:-translate-y-0.5 hover:bg-white hover:text-black"
        >
          Send Another Inquiry
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-lg border border-white/10 bg-white/[0.035] p-4 text-left shadow-2xl shadow-black/40 sm:space-y-5 sm:p-6 lg:p-8"
    >

      <div className="space-y-5">
        <p className="border-b border-white/10 pb-3 text-xs font-semibold uppercase tracking-[0.18em] text-stone-500 sm:hidden">
          Contact
        </p>

        {/* NAME / EMAIL */}
        <div className="grid gap-5 sm:grid-cols-2">

          <div className="min-w-0">
            <label htmlFor="name" className="mb-2 block text-[0.95rem] text-stone-300">
              Name <span className="text-xs text-stone-400">(required)</span>
            </label>

            <input
              id="name"
              name="name"
              autoComplete="name"
              value={form.name}
              onInvalid={handleContactInvalid}
              onChange={(event) => {
                setContactErrors((previous) => ({ ...previous, name: "" }));
                updateField(event);
              }}
              aria-invalid={Boolean(contactErrors.name)}
              aria-describedby={contactErrors.name ? "name-error" : undefined}
              required
              className={`w-full scroll-mt-24 rounded-lg border bg-black/70 px-4 py-3.5 text-base text-white outline-none transition ${contactErrors.name ? "border-red-400/70 focus:border-red-300" : "border-white/15 hover:border-white/25 focus:border-white/55"}`}
            />
            {contactErrors.name && (
              <p id="name-error" role="alert" className="mt-2 text-sm leading-5 text-red-300">
                {contactErrors.name}
              </p>
            )}
          </div>

          <div className="min-w-0">
            <label htmlFor="email" className="mb-2 block text-[0.95rem] text-stone-300">
              Email <span className="text-xs text-stone-400">(required)</span>
            </label>

            <input
              id="email"
              name="email"
              autoComplete="email"
              type="email"
              value={form.email}
              onInvalid={handleContactInvalid}
              onChange={(event) => {
                setContactErrors((previous) => ({ ...previous, email: "" }));
                updateField(event);
              }}
              aria-invalid={Boolean(contactErrors.email)}
              aria-describedby={contactErrors.email ? "email-error" : undefined}
              required
              className={`w-full scroll-mt-24 rounded-lg border bg-black/70 px-4 py-3.5 text-base text-white outline-none transition ${contactErrors.email ? "border-red-400/70 focus:border-red-300" : "border-white/15 hover:border-white/25 focus:border-white/55"}`}
            />
            {contactErrors.email && (
              <p id="email-error" role="alert" className="mt-2 text-sm leading-5 text-red-300">
                {contactErrors.email}
              </p>
            )}
          </div>

        </div>


        {/* PHONE / DATE */}
        <div className="grid gap-5 sm:grid-cols-2">

          <div className="min-w-0">
            <label htmlFor="phone" className="mb-2 block text-[0.95rem] text-stone-300">
              Phone <span className="text-xs text-stone-400">(required)</span>
            </label>

            <input
              id="phone"
              name="phone"
              type="tel"
              inputMode="tel"
              pattern={phonePattern}
              placeholder="7145551234"
              autoComplete="tel"
              value={form.phone}
              onInvalid={handleContactInvalid}
              onChange={(event) => {
                setContactErrors((previous) => ({ ...previous, phone: "" }));
                updateField(event);
              }}
              aria-invalid={Boolean(contactErrors.phone)}
              aria-describedby={contactErrors.phone ? "phone-error" : undefined}
              required
              className={`w-full scroll-mt-24 rounded-lg border bg-black/70 px-4 py-3.5 text-base text-white outline-none transition ${contactErrors.phone ? "border-red-400/70 focus:border-red-300" : "border-white/15 hover:border-white/25 focus:border-white/55"}`}
            />
            {contactErrors.phone && (
              <p id="phone-error" role="alert" className="mt-2 text-sm leading-5 text-red-300">
                {contactErrors.phone}
              </p>
            )}
          </div>

          <div className="min-w-0">

            <label htmlFor="eventDate" className="mb-2 block text-[0.95rem] text-stone-300">
              Event Date <span className="text-xs text-stone-400">(required)</span>
            </label>

            <div className={`relative w-full overflow-hidden rounded-lg border bg-black/70 transition ${contactErrors.eventDate ? "border-red-400/70 focus-within:border-red-300" : "border-white/15 hover:border-white/25 focus-within:border-white/55"}`}>
              <input
                id="eventDate"
                name="eventDate"
                type="date"
                min={getTodayString()}
                value={form.eventDate}
                onInvalid={handleContactInvalid}
                onChange={updateField}
                aria-invalid={Boolean(contactErrors.eventDate)}
                aria-describedby={contactErrors.eventDate ? "eventDate-error" : undefined}
                required
                className="block h-[54px] w-full scroll-mt-24 appearance-none bg-transparent px-4 py-3.5 text-base text-white outline-none [color-scheme:dark]"
              />
            </div>
            {contactErrors.eventDate && (
              <p id="eventDate-error" role="alert" className="mt-2 text-sm leading-5 text-red-300">
                {contactErrors.eventDate}
              </p>
            )}

          </div>

        </div>
      </div>

      <div className="space-y-5 border-t border-white/10 pt-5 sm:border-t-0 sm:pt-0">
        <p className="border-b border-white/10 pb-3 text-xs font-semibold uppercase tracking-[0.18em] text-stone-500 sm:hidden">
          Event Details
        </p>

        {/* LOCATION / GUEST COUNT */}
        <div className="grid gap-5 sm:grid-cols-2">

          <div className="min-w-0">

            <label htmlFor="eventLocation" className="mb-2 block text-[0.95rem] text-stone-300">
              Location / City <span className="text-xs text-stone-400">(required)</span>
            </label>

            <input
              id="eventLocation"
              name="eventLocation"
              type="text"
              placeholder="e.g. Irvine, CA"
              value={form.eventLocation}
              onInvalid={handleContactInvalid}
              onChange={(event) => {
                setContactErrors((previous) => ({ ...previous, eventLocation: "" }));
                updateField(event);
              }}
              aria-invalid={Boolean(contactErrors.eventLocation)}
              aria-describedby={contactErrors.eventLocation ? "eventLocation-error" : undefined}
              required
              className={`w-full scroll-mt-24 rounded-lg border bg-black/70 px-4 py-3.5 text-base text-white outline-none transition ${contactErrors.eventLocation ? "border-red-400/70 focus:border-red-300" : "border-white/15 hover:border-white/25 focus:border-white/55"}`}
            />
            {contactErrors.eventLocation && (
              <p id="eventLocation-error" role="alert" className="mt-2 text-sm leading-5 text-red-300">
                {contactErrors.eventLocation}
              </p>
            )}

          </div>

          <div className="min-w-0">

            <label htmlFor="guestCount" className="mb-2 block text-[0.95rem] text-stone-300">
              Estimated Guest Count <span className="text-xs text-stone-400">(required)</span>
            </label>

            <input
              id="guestCount"
              name="guestCount"
              type="text"
              placeholder="e.g. 30–40 guests"
              value={form.guestCount}
              onInvalid={handleContactInvalid}
              onChange={(event) => {
                setContactErrors((previous) => ({ ...previous, guestCount: "" }));
                updateField(event);
              }}
              aria-invalid={Boolean(contactErrors.guestCount)}
              aria-describedby={contactErrors.guestCount ? "guestCount-error" : undefined}
              required
              className={`w-full scroll-mt-24 rounded-lg border bg-black/70 px-4 py-3.5 text-base text-white outline-none transition ${contactErrors.guestCount ? "border-red-400/70 focus:border-red-300" : "border-white/15 hover:border-white/25 focus:border-white/55"}`}
            />
            {contactErrors.guestCount && (
              <p id="guestCount-error" role="alert" className="mt-2 text-sm leading-5 text-red-300">
                {contactErrors.guestCount}
              </p>
            )}

          </div>

        </div>


        {/* EVENT TYPE / EXPERIENCE */}
        <div className="grid gap-5 sm:grid-cols-2">

          <div className="min-w-0">

            <label htmlFor="eventType" className="mb-2 block text-[0.95rem] text-stone-300">
              Event Type
            </label>

            <div className="relative">

              <select
                id="eventType"
              name="eventType"
                value={form.eventType}
                onChange={updateField}
                required
                className="w-full appearance-none rounded-lg border border-white/15 bg-black/70 px-4 py-3.5 pr-10 text-white outline-none transition hover:border-white/25 focus:border-white/55"
              >
                <option value="">Select one</option>
                <option>Birthday</option>
                <option>Corporate Event</option>
                <option>Wedding</option>
                <option>Engagement Party</option>
                <option>Private Party</option>
                <option>Other</option>
              </select>

              <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-stone-400">
                ▾
              </div>

            </div>

          </div>

          <div className="min-w-0">

            <label htmlFor="preferredPackage" className="mb-2 block text-[0.95rem] text-stone-300">
              Preferred Experience
            </label>

            <div className="relative">

              <select
                id="preferredPackage"
              name="preferredPackage"
                value={form.preferredPackage}
                onChange={updateField}
                className="w-full appearance-none rounded-lg border border-white/15 bg-black/70 px-4 py-3.5 pr-10 text-white outline-none transition hover:border-white/25 focus:border-white/55"
              >
                <option value="">Not sure yet</option>
                {experiences.map((experience) => (
                  <optgroup key={experience.name} label={experience.name}>
                    <option>{experience.name} - Not sure yet</option>
                    {skewerOptions.map((skewers) => (
                      <option key={`${experience.name}-${skewers}`}>
                        {experience.name} - {skewers.toLocaleString()} Skewers
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>

              <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-stone-400">
                ▾
              </div>

            </div>

          </div>

        </div>
      </div>


      {/* MESSAGE */}
      <div className="border-t border-white/10 pt-5 sm:border-t-0 sm:pt-0">

        <label htmlFor="message" className="mb-2 block text-[0.95rem] text-stone-300">
              Tell us about your event
        </label>

        <textarea
          id="message"
              name="message"
          rows={5}
          value={form.message}
          onChange={updateField}
          className="w-full rounded-lg border border-white/15 bg-black/70 px-4 py-3.5 text-white outline-none transition hover:border-white/25 focus:border-white/55"
          placeholder="Event details, menu interest, setup notes, or anything special you'd like us to know."
        />

      </div>


      {/* SUBMIT */}
      <div className="pt-4 text-center">

        <button
          type="submit"
          disabled={isSubmitting}
          className="group inline-flex min-h-11 items-center justify-center gap-2.5 rounded-full bg-white px-7 py-2.5 text-[0.82rem] font-semibold uppercase tracking-[0.1em] text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-stone-200 disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-55 sm:px-8"
        >
          <span>{isSubmitting ? "Sending" : "Send Inquiry"}</span>
          <ArrowRight
            size={15}
            strokeWidth={1.8}
            className="transition group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </button>

      </div>


      {status.type && (
        <div
          role="status"
          className="status-card mx-auto flex max-w-xl items-start gap-3 rounded-lg border border-red-400/30 bg-red-950/20 p-4 text-[0.95rem] leading-6 text-red-200"
        >
          <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-red-400/30 text-red-300">
            <AlertCircle size={14} />
          </span>
          <span>{status.message}</span>
        </div>
      )}

    </form>
  );
}
