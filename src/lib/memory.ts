// src/lib/memory.ts

/**
 * Feature 10: Adaptive Site Memory
 *
 * Functions to save and load known-good DOM element selectors
 * based on previous successful executions on specific domains.
 */

export interface SiteMemory {
  domain: string;
  label: string;
  omni_id: string; // The selector or internal ID that worked
  success_count: number;
}

// In-memory mock store. In reality, this goes to Supabase `site_memory` table.
const memoryStore: SiteMemory[] = [];

export async function saveSiteMemory(domain: string, label: string, omni_id: string): Promise<void> {
  const existing = memoryStore.find(m => m.domain === domain && m.label === label);
  if (existing) {
    existing.success_count += 1;
    existing.omni_id = omni_id; // update to latest successful
    console.log(`Updated memory for ${domain} -> ${label} (successes: ${existing.success_count})`);
  } else {
    memoryStore.push({ domain, label, omni_id, success_count: 1 });
    console.log(`Saved new memory for ${domain} -> ${label} (${omni_id})`);
  }
}

export async function loadSiteMemory(domain: string): Promise<SiteMemory[]> {
  const memories = memoryStore.filter(m => m.domain === domain);
  console.log(`Loaded ${memories.length} memories for ${domain}`);
  return memories;
}
