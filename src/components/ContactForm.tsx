"use client";

import type { FormEvent } from "react";
import { useState } from "react";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mljebrjz";

type FieldName = "name" | "email" | "phone" | "message";
type FormErrors = Partial<Record<FieldName, string>>;
type SubmissionStatus = "idle" | "success" | "error";

const validators: Record<FieldName, (value: string) => string> = {
  name: (value) => {
    const trimmedValue = value.trim();

    if (!trimmedValue) return "Ingresa tu nombre.";
    if (trimmedValue.length < 2 || /\d/.test(trimmedValue)) {
      return "Ingresa un nombre válido.";
    }

    return "";
  },
  email: (value) => {
    const trimmedValue = value.trim();

    if (!trimmedValue) return "Ingresa tu correo.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedValue)) {
      return "Ingresa un correo válido.";
    }

    return "";
  },
  phone: (value) => {
    const trimmedValue = value.trim();
    const digits = trimmedValue.replace(/\D/g, "");

    if (!trimmedValue) return "Ingresa tu teléfono.";
    if (!/^\+?[0-9\s()-]+$/.test(trimmedValue)) {
      return "Usa solo números y los símbolos +, ( ), o -.";
    }
    if (digits.length < 8 || digits.length > 15) {
      return "Ingresa un teléfono válido de 8 a 15 dígitos.";
    }

    return "";
  },
  message: (value) => {
    const trimmedValue = value.trim();

    if (!trimmedValue) return "Escribe tu mensaje.";
    if (trimmedValue.length < 10) {
      return "El mensaje debe tener al menos 10 caracteres.";
    }

    return "";
  },
};

const fields: Array<{
  name: FieldName;
  label: string;
  type: "text" | "email" | "tel";
  autoComplete: string;
  placeholder: string;
  multiline?: boolean;
}> = [
  {
    name: "name",
    label: "Nombre",
    type: "text",
    autoComplete: "name",
    placeholder: "Tu nombre",
  },
  {
    name: "email",
    label: "Correo",
    type: "email",
    autoComplete: "email",
    placeholder: "nombre@correo.cl",
  },
  {
    name: "phone",
    label: "Teléfono",
    type: "tel",
    autoComplete: "tel",
    placeholder: "+56 9 1234 5678",
  },
  {
    name: "message",
    label: "Mensaje",
    type: "text",
    autoComplete: "off",
    placeholder: "Cuéntanos en qué podemos ayudarte",
    multiline: true,
  },
];

export default function ContactForm() {
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] =
    useState<SubmissionStatus>("idle");

  const validateField = (name: FieldName, value: string) => {
    const error = validators[name](value);

    setErrors((current) => ({ ...current, [name]: error }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const nextErrors = fields.reduce<FormErrors>((result, field) => {
      const value = String(formData.get(field.name) ?? "");
      const error = validators[field.name](value);

      if (error) result[field.name] = error;
      return result;
    }, {});

    setErrors(nextErrors);
    setSubmissionStatus("idle");

    if (Object.keys(nextErrors).length > 0) return;

    setIsSubmitting(true);

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (!response.ok) throw new Error(String(response.status));

      form.reset();
      setErrors({});
      setSubmissionStatus("success");
    } catch {
      setSubmissionStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      action={FORMSPREE_ENDPOINT}
      method="POST"
      noValidate
      onSubmit={handleSubmit}
      className="rounded-[2rem] bg-[var(--sand-yellow)] p-6 text-[var(--earth-black)] sm:p-9 lg:p-10"
    >
      <div className="space-y-7">
        {fields.map((field) => {
          const error = errors[field.name];

          return (
            <div key={field.name}>
              <label
                htmlFor={field.name}
                className="mb-2 block text-sm font-semibold"
              >
                {field.label}
              </label>
              {field.multiline ? (
                <textarea
                  id={field.name}
                  name={field.name}
                  autoComplete={field.autoComplete}
                  placeholder={field.placeholder}
                  required
                  rows={5}
                  aria-invalid={Boolean(error)}
                  aria-describedby={error ? `${field.name}-error` : undefined}
                  onBlur={(event) =>
                    validateField(field.name, event.currentTarget.value)
                  }
                  onChange={(event) => {
                    if (errors[field.name]) {
                      validateField(field.name, event.currentTarget.value);
                    }
                  }}
                  className={`w-full resize-y border-0 border-b bg-transparent px-0 py-3 text-base outline-none transition-colors placeholder:text-[var(--earth-black)]/35 ${
                    error
                      ? "border-red-700 focus:border-red-700"
                      : "border-[var(--earth-black)]/35 focus:border-[var(--blue)]"
                  }`}
                />
              ) : (
                <input
                  id={field.name}
                  name={field.name}
                  type={field.type}
                  autoComplete={field.autoComplete}
                  placeholder={field.placeholder}
                  required
                  aria-invalid={Boolean(error)}
                  aria-describedby={error ? `${field.name}-error` : undefined}
                  onBlur={(event) =>
                    validateField(field.name, event.currentTarget.value)
                  }
                  onChange={(event) => {
                    if (errors[field.name]) {
                      validateField(field.name, event.currentTarget.value);
                    }
                  }}
                  className={`w-full border-0 border-b bg-transparent px-0 py-3 text-base outline-none transition-colors placeholder:text-[var(--earth-black)]/35 ${
                    error
                      ? "border-red-700 focus:border-red-700"
                      : "border-[var(--earth-black)]/35 focus:border-[var(--blue)]"
                  }`}
                />
              )}
              {error && (
                <p
                  id={`${field.name}-error`}
                  className="mt-2 text-sm text-red-800"
                >
                  {error}
                </p>
              )}
            </div>
          );
        })}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-10 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[var(--earth-black)] px-7 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-[var(--sand-yellow)] transition-colors hover:bg-[var(--blue)] disabled:cursor-wait disabled:opacity-60 sm:w-auto"
      >
        {isSubmitting ? "Enviando…" : "Enviar"}
      </button>

      <div aria-live="polite" className="mt-5 min-h-6 text-sm">
        {submissionStatus === "success" && (
          <p>Gracias por escribirnos. Nos pondremos en contacto contigo pronto.</p>
        )}
        {submissionStatus === "error" && (
          <p className="text-red-800">
            No pudimos enviar el formulario. Intenta nuevamente o escríbenos a
            ventas@marez.cl.
          </p>
        )}
      </div>
    </form>
  );
}
