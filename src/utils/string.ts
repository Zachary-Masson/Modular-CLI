export function toSnakeCase(text: string): string {
  return text
    .replace(/([A-Z])/g, "_$1") // Ajoute un underscore avant chaque majuscule
    .toLowerCase() // Convertit toute la chaîne en minuscules
    .replace(/^_/, ""); // Enlève l'underscore initial s'il y en a un
}

export function toPascalCase(text: string): string {
  return text
    .split("_") // Séparer la chaîne par les underscores
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitaliser la première lettre de chaque mot
    .join(""); // Joindre les mots sans espace
}
