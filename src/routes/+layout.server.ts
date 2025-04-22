import { ENVIRONMENT } from "$env/static/private";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = () => {
  return {
    activatePreviewModal: ENVIRONMENT === "preview"
  };
};
