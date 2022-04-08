export function envError(name: string): never {
  throw Error(`Environment variable ${name} does not exist.`);
}