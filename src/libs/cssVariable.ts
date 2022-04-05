type Variable = [string, string];

export default function cssVariable(...variables: Variable[]) {
  document.documentElement.style.cssText = variables
    .map(([name, value]) => `--${name}:${value}`)
    .join(";");
}
