// Hero narrative copy and animation beat data — content changes here, not in HeroAnimation logic.
import type { HeroAnimationBeat } from "@/types/content";

export const heroNarrative = [
  "You walk into a kurta store, see one you like, and say \"this is nice, but I want something lighter, maybe brighter, with a smaller design on the border.\"",
  "The salesperson nods, and three minutes later you're holding exactly what you meant, even though you never could have searched for it.",
] as const;

export const heroProductIntro =
  "A conversational assistant for your store that understands how people actually describe things, then puts the right product in front of them.";

export const heroAnimationBeats: HeroAnimationBeat[] = [
  {
    id: "en-kurta",
    language: "en",
    customerMessage:
      "This is okay, but I want something lighter, brighter, with a smaller print.",
    productName: "Blush Block-Print Kurta",
    productDetail: "Light cotton · Soft pink · Fine block print",
    imageSrc: "/images/kurta-2.png",
    imageAlt: "Blush pink block-print kurta set",
  },
  {
    id: "hi-kurta",
    language: "hi",
    customerMessage:
      "यह ठीक है, लेकिन मुझे कुछ हल्का, चमकीला, छोटे प्रिंट वाला चाहिए।",
    productName: "Sage Self-Design Kurta",
    productDetail: "हल्का कपड़ा · म्यूटेड सेज · स्लिम प्लैकेट",
    imageSrc: "/images/kurta-5.png",
    imageAlt: "Sage green self-design kurta set",
  },
];
