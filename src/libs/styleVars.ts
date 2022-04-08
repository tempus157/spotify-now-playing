export default function styleVars(variables: object) {
  return Object.entries(variables)
    .map(([key, value]) => `--${key}:${value}`)
    .join(";");
}
