import type { MetadataRoute } from "next";

export const dynamic = "force-static";

/**
 * AI training crawlers: they absorb content into models and send no traffic back.
 * Blocked — the blog posts and printables are the assets most worth protecting.
 *
 * `Google-Extended` and `Applebot-Extended` are robots.txt-only signals, not real
 * user agents, so this file is the ONLY place they can be turned off. Neither
 * affects Googlebot or Applebot, so search ranking is untouched.
 */
const AI_TRAINING_CRAWLERS = [
  "GPTBot", // OpenAI, model training
  "ClaudeBot", // Anthropic, model training
  "CCBot", // Common Crawl — feeds many downstream training sets
  "Google-Extended", // Gemini training signal (NOT Googlebot)
  "Applebot-Extended", // Apple Intelligence training signal (NOT Applebot)
  "Bytespider", // ByteDance
  "meta-externalagent", // Meta AI
  "anthropic-ai", // legacy Anthropic token
  "cohere-ai",
  "Diffbot",
  "Omgilibot",
  "ImagesiftBot", // image-focused scraping — printables
];

/**
 * AI search + user-triggered agents: these index us so we can be *cited*, or fetch
 * a page because a parent just asked an assistant about it. That is referral
 * traffic, so it stays allowed — listed explicitly so the intent survives future
 * edits to the wildcard rule.
 */
const AI_SEARCH_AND_AGENTS = [
  "OAI-SearchBot", // ChatGPT search index
  "ChatGPT-User", // user asked ChatGPT to open a page
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: "/pins/", // internal pin-generator tool
      },
      {
        userAgent: AI_TRAINING_CRAWLERS,
        disallow: "/",
      },
      {
        userAgent: AI_SEARCH_AND_AGENTS,
        allow: "/",
        disallow: "/pins/",
      },
    ],
    sitemap: "https://myminicanvas.com/sitemap.xml",
  };
}
