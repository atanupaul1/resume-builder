export interface TemplateConfig {
  id: string;
  name: string;
  thumbnail: string;
  layout: string;
  colorScheme: string[];
  fontPair: string;
  category:
    | "Minimalist"
    | "Modern"
    | "Creative"
    | "ATS-Friendly"
    | "Corporate"
    | "Tech";
}
