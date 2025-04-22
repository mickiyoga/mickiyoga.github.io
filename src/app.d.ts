// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    // interface Locals {}
    // interface PageData {}
    // interface PageState {}
    // interface Platform {}
  }

  // For importing markdown files as components.
  declare module "*.md" {
    import type { SvelteComponent } from "svelte";

    export default class Comp extends SvelteComponent {}

    export const metadata: Record<string, unknown>;
  }

  // For importing YAML files.
  declare module "*.yml" {
    export default unknown;
  }
}

export {};
