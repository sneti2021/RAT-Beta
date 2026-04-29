"use client";

import Script from "next/script";
import { useEffect, useId } from "react";

type HubSpotWindow = Window & {
  hbspt?: {
    forms: {
      create: (options: {
        portalId: string;
        formId: string;
        target: string;
      }) => void;
    };
  };
};

export function HubSpotForm({
  portalId,
  formId,
}: {
  portalId?: string;
  formId?: string;
}) {
  const id = useId().replaceAll(":", "");

  useEffect(() => {
    const hubspot = (window as HubSpotWindow).hbspt;
    if (!portalId || !formId || !hubspot) {
      return;
    }

    hubspot.forms.create({
      portalId,
      formId,
      target: `#${id}`,
    });
  }, [formId, id, portalId]);

  if (!portalId || !formId) {
    return (
      <p className="text-sm text-[var(--muted)]">
        Add HubSpot portal ID and form ID in Sanity.
      </p>
    );
  }

  return (
    <>
      <Script src="//js.hsforms.net/forms/embed/v2.js" strategy="lazyOnload" />
      <div id={id} />
    </>
  );
}
