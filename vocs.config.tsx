import * as React from "react";
import { defineConfig } from "vocs";

const posthogSnippet = `
!function(t,e){var o,n,p,r;e.__SV||(window.posthog && window.posthog.__loaded)||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="Ii init Di qi Sr Bi Zi Pi capture calculateEventProperties Yi register register_once register_for_session unregister unregister_for_session Xi getFeatureFlag getFeatureFlagPayload getFeatureFlagResult isFeatureEnabled reloadFeatureFlags updateFlags updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures on onFeatureFlags onSurveysLoaded onSessionId getSurveys getActiveMatchingSurveys renderSurvey displaySurvey cancelPendingSurvey canRenderSurvey canRenderSurveyAsync Ji identify setPersonProperties group resetGroups setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetGroupPropertiesForFlags reset get_distinct_id getGroups get_session_id get_session_replay_url alias set_config startSessionRecording stopSessionRecording sessionRecordingStarted captureException startExceptionAutocapture stopExceptionAutocapture loadToolbar get_property getSessionProperty Wi Vi createPersonProfile setInternalOrTestUser Gi Fi Ki opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing get_explicit_consent_status is_capturing clear_opt_in_out_capturing $i debug Tr Ui getPageViewId captureTraceFeedback captureTraceMetric Ri".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
if (window.location.hostname !== 'localhost') {
  posthog.init('phc_yO8qr8j1QKsm60VrzE08lRg8wbEYc1SZTcTTtfaOvH1', {
    api_host: 'https://p.iron.sh',
    ui_host: 'https://us.posthog.com',
    defaults: '2026-01-30',
    person_profiles: 'identified_only',
    enable_heatmaps: true,
  })
}
`;

const conversionTrackingSnippet = `
(function () {
  if (typeof window === 'undefined') return;
  function pageContext() {
    return { path: window.location.pathname, page_title: document.title };
  }
  function findAnchor(target) {
    while (target && target !== document.body) {
      if (target.tagName === 'A') return target;
      target = target.parentElement;
    }
    return null;
  }
  document.addEventListener('click', function (event) {
    var anchor = findAnchor(event.target);
    if (!anchor) return;
    var href = anchor.getAttribute('href') || '';
    var source = anchor.getAttribute('data-cta-source') || pageContext().path;
    if (href.indexOf('cal.com') !== -1) {
      if (window.posthog) window.posthog.capture('cal_com_click', Object.assign({ source: source, href: href }, pageContext()));
    } else if (href.indexOf('github.com') !== -1) {
      if (window.posthog) window.posthog.capture('github_click', Object.assign({ source: source, href: href }, pageContext()));
    }
  }, true);
  document.addEventListener('copy', function () {
    var sel = window.getSelection ? String(window.getSelection()) : '';
    if (!sel) return;
    if (/docker\\s+(run|compose)/.test(sel) || /iron-proxy/.test(sel)) {
      if (window.posthog) window.posthog.capture('quickstart_command_copied', Object.assign({ length: sel.length }, pageContext()));
    }
  }, true);
})();
`;

export default defineConfig({
  title: "iron.sh",
  description: "iron-proxy documentation",
  rootDir: "docs",
  logoUrl: "/logo.svg",
  iconUrl: "/favicon.ico",
  head: ({ path }) => {
    const SITE_URL = "https://docs.iron.sh";
    const normalized = path === "/" ? "" : path.replace(/\/$/, "");
    const canonical = `${SITE_URL}${normalized}`;
    return (
      <>
        <link rel="canonical" href={canonical} />
        <script dangerouslySetInnerHTML={{ __html: posthogSnippet }} />
        <script dangerouslySetInnerHTML={{ __html: conversionTrackingSnippet }} />
      </>
    );
  },
  font: {
    mono: { google: "JetBrains Mono" },
  },
  topNav: [
    { text: "Blog", link: "https://iron.sh/blog" },
    { text: "Talk to us", link: "https://cal.com/matt-slipper-ironsh/15min" },
  ],
  socials: [
    { icon: "github", link: "https://github.com/ironsh/iron-proxy" },
  ],
  editLink: {
    pattern: "https://github.com/ironsh/docs/edit/main/docs/pages/:path",
    text: "Edit on GitHub",
  },
  theme: {
    colorScheme: "dark",
    accentColor: "#e05a2b",
    variables: {
      color: {
        background: { dark: "#0e0e0e", light: "#ffffff" },
        background2: { dark: "#111111", light: "#f9f9f9" },
        background3: { dark: "#161616", light: "#f6f6f6" },
        background4: { dark: "#1c1c1c", light: "#f0f0f0" },
        background5: { dark: "#222222", light: "#e8e8e8" },
        backgroundDark: { dark: "#0a0a0a", light: "#f9f9f9" },
        backgroundAccent: { dark: "#e05a2b", light: "#e05a2b" },
        backgroundAccentHover: { dark: "#c94d23", light: "#c94d23" },
        backgroundAccentText: { dark: "#ffffff", light: "#ffffff" },
        border: { dark: "#2a2a2a", light: "#ececec" },
        border2: { dark: "#3a3a3a", light: "#cecece" },
        borderAccent: { dark: "#e05a2b4d", light: "#e05a2b" },
        heading: { dark: "#f0f0f0", light: "#202020" },
        text: { dark: "#b0b0b0", light: "#4c4c4c" },
        text2: { dark: "#888888", light: "#646464" },
        text3: { dark: "#666666", light: "#838383" },
        text4: { dark: "#555555", light: "#bbbbbb" },
        textAccent: { dark: "#e05a2b", light: "#c94d23" },
        textAccentHover: { dark: "#ef6e3f", light: "#a83d18" },
        link: { dark: "#e05a2b", light: "#c94d23" },
        linkHover: { dark: "#ef6e3f", light: "#a83d18" },
        codeBlockBackground: { dark: "#0a0a0a", light: "#f9f9f9" },
        codeInlineBackground: { dark: "#161616", light: "#f0f0f0" },
        codeInlineBorder: { dark: "#2a2a2a", light: "#ececec" },
        codeInlineText: { dark: "#f0f0f0", light: "#202020" },
        codeTitleBackground: { dark: "#111111", light: "#f6f6f6" },
        infoBackground: { dark: "#e05a2b14", light: "#e05a2b14" },
        infoBorder: { dark: "#e05a2b4d", light: "#e05a2b4d" },
        infoText: { dark: "#e05a2b", light: "#c94d23" },
        warningBackground: { dark: "#1f1708", light: "#fff8e6" },
        warningBorder: { dark: "#8a6000", light: "#f5a623" },
        warningText: { dark: "#f5a623", light: "#9e6c00" },
        warningTextHover: { dark: "#ffba4d", light: "#704c00" },
        dangerBackground: { dark: "#1f0d0d", light: "#fff0f0" },
        dangerBorder: { dark: "#7a1c1c", light: "#e03c3c" },
        dangerText: { dark: "#e03c3c", light: "#b02525" },
        dangerTextHover: { dark: "#ef5050", light: "#7a1c1c" },
        successBackground: { dark: "#0d1f12", light: "#f0fff5" },
        successBorder: { dark: "#1a7a3c", light: "#34c96a" },
        successText: { dark: "#34c96a", light: "#1a7a3c" },
        successTextHover: { dark: "#5dd789", light: "#0f5828" },
        tipBackground: { dark: "#0d1f12", light: "#f0fff5" },
        tipBorder: { dark: "#1a7a3c", light: "#34c96a" },
        tipText: { dark: "#34c96a", light: "#1a7a3c" },
        tipTextHover: { dark: "#5dd789", light: "#0f5828" },
        noteBackground: { dark: "#161616", light: "#f6f6f6" },
        noteBorder: { dark: "#3a3a3a", light: "#cecece" },
        noteText: { dark: "#b0b0b0", light: "#4c4c4c" },
        blockquoteBorder: { dark: "#3a3a3a", light: "#cecece" },
        blockquoteText: { dark: "#888888", light: "#646464" },
        tableBorder: { dark: "#2a2a2a", light: "#ececec" },
        tableHeaderBackground: { dark: "#111111", light: "#f6f6f6" },
        tableHeaderText: { dark: "#f0f0f0", light: "#202020" },
        hr: { dark: "#2a2a2a", light: "#ececec" },
      },
    },
  },
  sidebar: [
    { text: "Overview", link: "/" },
    { text: "Quickstart", link: "/quickstart" },
    { text: "Getting Help", link: "/help" },
    {
      text: "Use Cases",
      collapsed: false,
      items: [
        { text: "CI/CD Egress Control", link: "/use-cases/ci-cd" },
        { text: "AI Coding Agents", link: "/use-cases/ai-coding-agents" },
        { text: "Sandboxed Code Execution", link: "/use-cases/sandboxed-code" },
      ],
    },
    {
      text: "Configure Policies",
      collapsed: false,
      items: [
        { text: "Concept: Transforms", link: "/policies/transforms" },
        { text: "Host Allowlist", link: "/policies/host-allowlist" },
        {
          text: "Credential Proxying",
          collapsed: false,
          items: [
            { text: "Overview", link: "/credential-proxying/overview" },
            { text: "Static Secrets", link: "/credential-proxying/static-secrets" },
            { text: "OAuth2 Token Injection", link: "/credential-proxying/oauth-token" },
            { text: "HMAC Request Signing", link: "/credential-proxying/hmac-sign" },
            { text: "AWS Request Signing", link: "/credential-proxying/aws-auth" },
            { text: "GCP Service Accounts", link: "/credential-proxying/gcp-auth" },
          ],
        },
        { text: "LLM Judge", link: "/policies/llm-judge" },
        { text: "Header Allowlist", link: "/policies/header-allowlist" },
        { text: "MCP Interception", link: "/policies/mcp-interception" },
      ],
    },
    {
      text: "Deploy",
      collapsed: false,
      items: [
        { text: "Overview", link: "/deploy/overview" },
        { text: "Bare Metal", link: "/deploy/bare-metal" },
        { text: "Kubernetes", link: "/deploy/kubernetes" },
        { text: "Amazon ECS", link: "/deploy/ecs" },
        { text: "GitHub Actions", link: "/deploy/github-actions" },
        { text: "Daytona", link: "/deploy/daytona" },
        { text: "Freestyle", link: "/deploy/freestyle" },
      ],
    },
    {
      text: "Operate",
      collapsed: false,
      items: [
        {
          text: "Control Plane",
          collapsed: false,
          items: [
            { text: "Overview", link: "/control-plane/overview" },
            { text: "Enrollment", link: "/control-plane/enrollment" },
            { text: "Policies", link: "/control-plane/policies" },
            { text: "Self-Hosted", link: "/control-plane/self-hosted" },
          ],
        },
      ],
    },
    {
      text: "Guides",
      collapsed: false,
      items: [
        { text: "Configuring OTEL Export", link: "/guides/otel-export" },
        { text: "Managing CA Certificates", link: "/guides/ca-certificates" },
        { text: "Tunneling with SOCKS5 and CONNECT", link: "/guides/socks5-connect" },
      ],
    },
    {
      text: "Reference",
      collapsed: false,
      items: [
        { text: "Configuration", link: "/reference/configuration" },
        {
          text: "Control Plane API",
          collapsed: true,
          items: [
            { text: "Overview", link: "/control-plane/api/overview" },
            { text: "Network Policies", link: "/control-plane/api/network-policies" },
            { text: "Secret Policies", link: "/control-plane/api/secret-policies" },
            { text: "MCP Policies", link: "/control-plane/api/mcp-policies" },
          ],
        },
      ],
    },
  ],
});
