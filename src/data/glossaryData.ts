import { GLOSSARY_CELLS_AND_MOLECULAR } from './glossaryCellsAndMolecular';
import { GLOSSARY_TREE_AND_BODY } from './glossaryTreeAndBody';
import type { GlossaryEntry } from './glossaryTypes';

export type { GlossaryEntry } from './glossaryTypes';

export const GLOSSARY_MAP: Record<string, GlossaryEntry> = {
  ...GLOSSARY_TREE_AND_BODY,
  ...GLOSSARY_CELLS_AND_MOLECULAR,
};

function normalizeKey(term: string): string {
  return term.trim().toLowerCase().replace(/\s+/g, ' ');
}

const NORMALIZED_GLOSSARY_MAP: Record<string, GlossaryEntry> = Object.fromEntries(
  Object.entries(GLOSSARY_MAP).map(([key, value]) => [normalizeKey(key), value]),
);

export function lookupGlossaryEntry(
  term: string,
  fallbackCategory = 'Fagbegrep',
): GlossaryEntry {
  const exact = GLOSSARY_MAP[term];
  if (exact) return exact;

  const normalized = NORMALIZED_GLOSSARY_MAP[normalizeKey(term)];
  if (normalized) return normalized;

  return {
    category: fallbackCategory,
    definition: `${term} er et sentralt biologisk nøkkelbegrep eller eksempel knyttet til dette steget i undervisningstemaet.`,
  };
}
