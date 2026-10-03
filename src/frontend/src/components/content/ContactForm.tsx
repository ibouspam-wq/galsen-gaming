import { Button } from "@/components/common/Button";
import { CheckCircle2, Send } from "lucide-react";
import { type FormEvent, useState } from "react";

interface FormValues {
  name: string;
  email: string;
  message: string;
}

type FormErrors = Partial<Record<keyof FormValues, string>>;

const EMPTY: FormValues = { name: "", email: "", message: "" };
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};
  if (values.name.trim().length < 2) {
    errors.name = "Indiquez votre nom (2 caractères minimum).";
  }
  if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = "Indiquez une adresse e-mail valide.";
  }
  if (values.message.trim().length < 10) {
    errors.message = "Votre message doit contenir au moins 10 caractères.";
  }
  return errors;
}

const inputClasses =
  "w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground transition-fast focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

export function ContactForm() {
  const [values, setValues] = useState<FormValues>(EMPTY);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  function update<K extends keyof FormValues>(key: K, value: string) {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
    setSubmitted(false);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setSubmitted(false);
      return;
    }
    setValues(EMPTY);
    setSubmitted(true);
  }

  return (
    <form
      data-ocid="contact.form"
      onSubmit={handleSubmit}
      noValidate
      className="flex flex-col gap-5 rounded-2xl border border-border bg-card p-6 md:p-8"
    >
      <div className="flex flex-col gap-2">
        <label
          htmlFor="contact-name"
          className="text-sm font-medium text-foreground"
        >
          Nom
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          autoComplete="name"
          value={values.name}
          onChange={(event) => update("name", event.target.value)}
          placeholder="Votre nom"
          aria-invalid={errors.name ? true : undefined}
          aria-describedby={errors.name ? "contact-name-error" : undefined}
          data-ocid="contact.name_input"
          className={inputClasses}
        />
        {errors.name ? (
          <p
            id="contact-name-error"
            data-ocid="contact.name_error"
            className="text-xs text-destructive"
          >
            {errors.name}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="contact-email"
          className="text-sm font-medium text-foreground"
        >
          E-mail
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          value={values.email}
          onChange={(event) => update("email", event.target.value)}
          placeholder="vous@exemple.com"
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={errors.email ? "contact-email-error" : undefined}
          data-ocid="contact.email_input"
          className={inputClasses}
        />
        {errors.email ? (
          <p
            id="contact-email-error"
            data-ocid="contact.email_error"
            className="text-xs text-destructive"
          >
            {errors.email}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="contact-message"
          className="text-sm font-medium text-foreground"
        >
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          value={values.message}
          onChange={(event) => update("message", event.target.value)}
          placeholder="Décrivez votre demande…"
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={
            errors.message ? "contact-message-error" : undefined
          }
          data-ocid="contact.message_textarea"
          className={`${inputClasses} resize-y`}
        />
        {errors.message ? (
          <p
            id="contact-message-error"
            data-ocid="contact.message_error"
            className="text-xs text-destructive"
          >
            {errors.message}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-muted-foreground">
          Formulaire de démonstration : aucun message n'est réellement envoyé.
        </p>
        <Button type="submit" data-ocid="contact.submit_button">
          <Send aria-hidden="true" />
          Envoyer le message
        </Button>
      </div>

      {submitted ? (
        <output
          data-ocid="contact.success_state"
          className="flex items-start gap-3 rounded-xl border border-success/40 bg-success/10 p-4"
        >
          <CheckCircle2
            className="mt-0.5 size-5 shrink-0 text-success"
            aria-hidden="true"
          />
          <div>
            <p className="text-sm font-semibold text-foreground">
              Message bien reçu
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Merci ! Votre demande a été prise en compte. Notre équipe vous
              répondra dans les plus brefs délais.
            </p>
          </div>
        </output>
      ) : null}
    </form>
  );
}
