import { useMDXComponents as getThemeComponents } from "nextra-theme-docs";
import { withGitHubAlert } from "nextra/components";

const themeComponents = getThemeComponents();

export function useMDXComponents(components) {
  return { ...themeComponents, ...components };
}
