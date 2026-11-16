/**
 * What the form change handlers read from an event. Real input/select/textarea change events fit,
 * and so do the synthetic `{ target: { name, type, checked } }` objects used by clickable cards.
 */
export type FieldChange = {
  target: { name: string; value?: string; type: string; checked?: boolean };
};
