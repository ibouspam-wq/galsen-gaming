import { Button } from "@/components/common/Button";
import type { ShippingInfo } from "@/types/catalog";
import { Loader2, Lock } from "lucide-react";
import { type FormEvent, useState } from "react";

export type ShippingField = keyof ShippingInfo;

export interface ShippingFormValues {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  notes: string;
}

const EMPTY_VALUES: ShippingFormValues = {
  fullName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  postalCode: "",
  country: "France",
  notes: "",
};

interface FieldConfig {
  name: ShippingField;
  label: string;
  placeholder: string;
  type?: string;
  autoComplete?: string;
  required?: boolean;
  full?: boolean;
  textarea?: boolean;
}

const FIELDS: FieldConfig[] = [
  {
    name: "fullName",
    label: "Nom complet",
    placeholder: "Awa Diop",
    autoComplete: "name",
    required: true,
    full: true,
  },
  {
    name: "email",
    label: "Adresse e-mail",
    placeholder: "awa.diop@exemple.fr",
    type: "email",
    autoComplete: "email",
    required: true,
  },
  {
    name: "phone",
    label: "Téléphone",
    placeholder: "06 12 34 56 78",
    type: "tel",
    autoComplete: "tel",
    required: true,
  },
  {
    name: "address",
    label: "Adresse",
    placeholder: "12 rue des Gamers",
    autoComplete: "street-address",
    required: true,
    full: true,
  },
  {
    name: "postalCode",
    label: "Code postal",
    placeholder: "75011",
    autoComplete: "postal-code",
    required: true,
  },
  {
    name: "city",
    label: "Ville",
    placeholder: "Paris",
    autoComplete: "address-level2",
    required: true,
  },
  {
    name: "country",
    label: "Pays",
    placeholder: "France",
    autoComplete: "country-name",
    required: true,
    full: true,
  },
  {
    name: "notes",
    label: "Instructions de livraison (facultatif)",
    placeholder: "Code d'entrée, étage, créneau souhaité…",
    textarea: true,
    full: true,
  },
];

function validate(
  values: ShippingFormValues,
): Partial<Record<ShippingField, string>> {
  const errors: Partial<Record<ShippingField, string>> = {};
  if (!values.fullName.trim()) errors.fullName = "Indiquez votre nom complet.";
  if (!values.email.trim()) {
    errors.email = "Indiquez votre adresse e-mail.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = "Cette adresse e-mail semble invalide.";
  }
  if (!values.phone.trim()) errors.phone = "Indiquez un numéro de téléphone.";
  if (!values.address.trim()) errors.address = "Indiquez votre adresse.";
  if (!values.postalCode.trim())
    errors.postalCode = "Indiquez votre code postal.";
  if (!values.city.trim()) errors.city = "Indiquez votre ville.";
  if (!values.country.trim()) errors.country = "Indiquez votre pays.";
  return errors;
}

interface CheckoutFormProps {
  isSubmitting: boolean;
  errorMessage?: string;
  onSubmit: (shipping: ShippingInfo) => void;
}

export function CheckoutForm({
  isSubmitting,
  errorMessage,
  onSubmit,
}: CheckoutFormProps) {
  const [values, setValues] = useState<ShippingFormValues>(EMPTY_VALUES);
  const [errors, setErrors] = useState<Partial<Record<ShippingField, string>>>(
    {},
  );

  const update = (field: ShippingField, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const shipping: ShippingInfo = {
      fullName: values.fullName.trim(),
      email: values.email.trim(),
      phone: values.phone.trim(),
      address: values.address.trim(),
      city: values.city.trim(),
      postalCode: values.postalCode.trim(),
      country: values.country.trim(),
      notes: values.notes.trim() ? values.notes.trim() : undefined,
    };
    onSubmit(shipping);
  };

  return (
    <form
      data-ocid="checkout.form"
      onSubmit={handleSubmit}
      noValidate
      className="flex flex-col gap-6 rounded-2xl border border-border bg-card p-6 shadow-subtle md:p-8"
    >
      <div>
        <h2 className="font-display text-lg font-bold text-foreground">
          Informations de livraison
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Renseignez l&apos;adresse où vous souhaitez recevoir votre commande.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        {FIELDS.map((field) => {
          const error = errors[field.name];
          const inputId = `checkout-${field.name}`;
          const describedBy = error ? `${inputId}-error` : undefined;
          const baseClass =
            "w-full rounded-xl border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/70 transition-fast focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";
          const stateClass = error
            ? "border-destructive focus-visible:ring-destructive"
            : "border-input";

          return (
            <div
              key={field.name}
              className={field.full ? "sm:col-span-2" : undefined}
            >
              <label
                htmlFor={inputId}
                className="mb-2 block text-sm font-medium text-foreground"
              >
                {field.label}
                {field.required ? (
                  <span className="ml-1 text-primary" aria-hidden="true">
                    *
                  </span>
                ) : null}
              </label>
              {field.textarea ? (
                <textarea
                  id={inputId}
                  name={field.name}
                  data-ocid={`checkout.${field.name}_input`}
                  value={values[field.name]}
                  onChange={(event) => update(field.name, event.target.value)}
                  placeholder={field.placeholder}
                  rows={3}
                  aria-invalid={error ? true : undefined}
                  aria-describedby={describedBy}
                  className={`${baseClass} ${stateClass} resize-none`}
                />
              ) : (
                <input
                  id={inputId}
                  name={field.name}
                  type={field.type ?? "text"}
                  autoComplete={field.autoComplete}
                  data-ocid={`checkout.${field.name}_input`}
                  value={values[field.name]}
                  onChange={(event) => update(field.name, event.target.value)}
                  placeholder={field.placeholder}
                  aria-invalid={error ? true : undefined}
                  aria-describedby={describedBy}
                  className={`${baseClass} ${stateClass}`}
                />
              )}
              {error ? (
                <p
                  id={`${inputId}-error`}
                  data-ocid={`checkout.${field.name}_error`}
                  className="mt-1.5 text-xs text-destructive"
                >
                  {error}
                </p>
              ) : null}
            </div>
          );
        })}
      </div>

      {errorMessage ? (
        <p
          data-ocid="checkout.error_state"
          role="alert"
          className="rounded-xl border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive"
        >
          {errorMessage}
        </p>
      ) : null}

      <div className="flex flex-col gap-3 border-t border-border pt-5">
        <Button
          type="submit"
          size="lg"
          className="w-full"
          disabled={isSubmitting}
          data-ocid="checkout.submit_button"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="size-4 animate-spin" aria-hidden="true" />
              Traitement en cours…
            </>
          ) : (
            "Confirmer la commande"
          )}
        </Button>
        <p className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <Lock className="size-3.5 text-primary" aria-hidden="true" />
          Aucune donnée bancaire n&apos;est demandée. Commande de démonstration.
        </p>
      </div>
    </form>
  );
}
