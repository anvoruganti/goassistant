// Hero narrative copy and animation beat data — content changes here, not in HeroAnimation logic.
import type { HeroAnimationBeat } from "@/types/content";

export const heroNarrative = [
  "You walk into a kurta store. You see something. \"This is nice,\" you say, \"but I want something lighter — brighter, maybe — with a smaller design on the border.\"",
  "The salesperson nods, and three minutes later you're holding exactly what you meant, even though you never could've searched for it.",
] as const;

export const heroProductIntro =
  "A conversational AI for your online store that understands descriptive, comparative, preference-based language — and turns it into the right product recommendation.";

export const heroAnimationBeats: HeroAnimationBeat[] = [
  {
    id: "en-kurta",
    language: "en",
    customerMessage:
      "This is okay, but I want something lighter, brighter, with a smaller border design.",
    productName: "Indigo Block Kurta",
    productDetail: "Light cotton · Brighter indigo · Minimal border print",
    imageSrc: "/images/product-kurta.svg",
    imageAlt: "Light indigo kurta with minimal border design",
  },
  {
    id: "hi-kurta",
    language: "hi",
    customerMessage:
      "यह ठीक है, लेकिन मुझे कुछ हल्का, चमकीला, छोटे बॉर्डर डिज़ाइन वाला चाहिए।",
    productName: "Indigo Block Kurta",
    productDetail: "हल्का कॉटन · चमकीला इंडिगो · मिनिमल बॉर्डर",
    imageSrc: "/images/product-kurta.svg",
    imageAlt: "Light indigo kurta with minimal border design",
  },
];
