// US/Canada-style numbers: ten digits, with optional formatting and country code 1.
export const phonePattern = String.raw`\s*(?:\+?1[\s.\-]*)?(?:\([2-9][0-9]{2}\)|[2-9][0-9]{2})[\s.\-]*[2-9][0-9]{2}[\s.\-]*[0-9]{4}\s*`;

export const phoneValidationMessage =
  "Please enter a valid 10-digit phone number, like 7145551234";

export function isValidPhoneNumber(value: unknown): value is string {
  return typeof value === "string" && new RegExp(`^(?:${phonePattern})$`).test(value);
}
