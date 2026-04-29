import type { Section } from "@/lib/types";

export function NativeForm({ form }: { form?: Section["form"] }) {
  const fields = form?.fields?.length
    ? form.fields
    : [
        { _key: "name", label: "Name", name: "name", type: "text", required: true },
        { _key: "email", label: "Email", name: "email", type: "email", required: true },
        { _key: "message", label: "Message", name: "message", type: "textarea" },
      ];

  return (
    <form
      action="/api/forms"
      method="post"
      className="grid gap-4 rounded-lg bg-white p-6 shadow-sm"
    >
      {fields.map((field) => (
        <label key={field._key} className="grid gap-2 text-sm font-semibold">
          {field.label}
          {field.type === "textarea" ? (
            <textarea
              name={field.name}
              required={field.required}
              className="min-h-32 rounded-md border border-[var(--line)] px-3 py-3"
            />
          ) : (
            <input
              name={field.name}
              type={field.type || "text"}
              required={field.required}
              className="h-12 rounded-md border border-[var(--line)] px-3"
            />
          )}
        </label>
      ))}
      <button className="btn btn-primary" type="submit">
        Submit
      </button>
    </form>
  );
}
