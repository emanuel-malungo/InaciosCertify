/**
 * Utilitários de nome — seguros para cliente e servidor (sem dependências de Node).
 */

const CONNECTORS = new Set(["de", "da", "do", "das", "dos", "e"]);

export function normalizeName(raw: string): string {
  return raw.normalize("NFC").trim().replace(/\s+/g, " ");
}

/** "joão DA silva" → "João da Silva" (conectores em minúsculas, hífen/apóstrofo respeitados). */
export function formatName(raw: string): string {
  return normalizeName(raw)
    .toLocaleLowerCase("pt-PT")
    .split(" ")
    .map((word, i) =>
      i > 0 && CONNECTORS.has(word)
        ? word
        : word.replace(/(^|[-'’])(\p{L})/gu, (_, sep: string, c: string) => sep + c.toLocaleUpperCase("pt-PT")),
    )
    .join(" ");
}

const NAME_CHARS = /^[\p{L}\p{M}][\p{L}\p{M}'’.\- ]*$/u;

/** Devolve a mensagem de erro (pt) ou null se o nome for aceitável. */
export function validateFullName(raw: string): string | null {
  const name = normalizeName(raw);
  if (name.length < 5) return "Digite o seu nome completo (nome e apelido).";
  if (name.length > 80) return "O nome é demasiado longo (máximo 80 caracteres).";
  if (!NAME_CHARS.test(name)) return "O nome só pode conter letras, espaços, hífen e apóstrofo.";
  const meaningful = name.split(" ").filter((w) => w.replace(/[^\p{L}]/gu, "").length >= 2);
  if (meaningful.length < 2) return "Digite o seu nome completo (nome e apelido).";
  return null;
}
