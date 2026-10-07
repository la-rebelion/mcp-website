import type { ClientModule } from "@docusaurus/types";

interface HubSpotWindow extends Window {
  _hsq?: unknown[][];
}

// Docusaurus is a single-page app: tell HubSpot about client-side navigation so the
// tracking code re-scans the page for non-HubSpot forms.
const module: ClientModule = {
  onRouteDidUpdate({ location, previousLocation }) {
    if (!previousLocation || previousLocation.pathname === location.pathname) return;
    const hsq = ((window as HubSpotWindow)._hsq = (window as HubSpotWindow)._hsq || []);
    hsq.push(["setPath", location.pathname + location.search]);
    hsq.push(["trackPageView"]);
  },
};

export default module;
