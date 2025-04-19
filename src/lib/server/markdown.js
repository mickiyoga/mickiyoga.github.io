import { SKIP, visit } from "unist-util-visit";
import { h } from "hastscript";

// TODO: Convert to TypeScript - will need to also convert svelte.config.js,
//   which has issues handling imported .md files as code.

export const MDSVEX_CONFIG = {
  extensions: [".md"],
  rehypePlugins: [[enhanceHtml]]
};

function enhanceHtml() {
  // TODO: Can I use svelte components here instead of hastscript?

  return function (tree) {
    visit(tree, { tagName: "a" }, ({ properties }) => {
      properties.target = "_blank";
    });

    visit(tree, { tagName: "blockquote" }, (blockquote) => {
      blockquote.properties.class =
        "box has-background-primary has-text-white has-text-weight-semibold";
      blockquote.tagName = "div";
    });

    visit(tree, { tagName: "img" }, (image, i, parent) => {
      const { src, alt, title } = image.properties;

      if (src.startsWith("http://") || src.startsWith("https://")) {
        return;
      }

      image.tagName = "enhanced:img";
      image.properties = {
        ...image.properties,
        sizes: "min(800px, 90vw)"
      };

      if (parent.tagName === "p") {
        parent.tagName = "div";
      }

      const caption = title ?? alt ?? null;

      const cardImage = h(".card-image", h("figure.image", [image]));

      const cardFooter = caption
        ? h("footer.card-content.has-text-centered", h("p.is-italic", caption))
        : null;

      const card = h(".card.my-6", [cardImage, cardFooter].filter(Boolean));

      parent.children[i] = card;

      return SKIP;
    });
  };
}
