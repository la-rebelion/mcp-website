import React, { useId, useState, type ReactNode } from "react";

/**
 * Non-HubSpot forms are collected by the HubSpot tracking code, which listens to the
 * native submit of a static <form>. The form therefore must not have JavaScript bound to
 * its submit event, so it is submitted natively into a hidden iframe (the page does not
 * navigate) and the "thank you" state is driven by the iframe `load` event instead.
 * @see https://knowledge.hubspot.com/forms/use-non-hubspot-forms
 */
export interface NativeFormSink {
  submitted: boolean;
  reset: () => void;
  formProps: { method: "POST"; action: string; target: string };
  sink: ReactNode;
}

const SINK_URL = "/hs-sink.html";

export function useNativeFormSink(): NativeFormSink {
  const name = `hs-sink-${useId().replace(/:/g, "")}`;
  const [submitted, setSubmitted] = useState(false);

  const handleLoad = (event: React.SyntheticEvent<HTMLIFrameElement>) => {
    try {
      // The initial about:blank load is not a submission.
      if (event.currentTarget.contentWindow?.location.href === "about:blank") return;
    } catch {
      // A blocked/cross-origin response still means the form was posted.
    }
    setSubmitted(true);
  };

  return {
    submitted,
    reset: () => setSubmitted(false),
    formProps: { method: "POST", action: SINK_URL, target: name },
    sink: <iframe name={name} title="Form submission" hidden tabIndex={-1} onLoad={handleLoad} />,
  };
}
