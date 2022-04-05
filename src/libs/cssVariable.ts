export default function cssVariable(...variables: [string, string][]) {
  document.documentElement.style.cssText = variables
    .map(([name, value]) => `--${name}:${value}`)
    .join(";");
}
