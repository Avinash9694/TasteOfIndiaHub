import { describe, expect, it, vi } from 'vitest';
import bundled from '../chefs.json';
import { loadBundledCatalog, loadCatalog } from '../load';

const jsonResponse = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json' } });

describe('loadCatalog', () => {
  it('uses bundled data when no API URL is configured', async () => {
    const result = await loadCatalog({ apiUrl: undefined });
    expect(result.source).toBe('bundled');
    expect(result.warning).toBeUndefined();
    expect(result.recipes).toHaveLength(loadBundledCatalog().recipes.length);
  });

  it('fetches from the API when configured', async () => {
    const fetchImpl = vi.fn().mockResolvedValue(jsonResponse(bundled));
    const result = await loadCatalog({ apiUrl: 'https://api.example.com/', fetchImpl });
    expect(fetchImpl).toHaveBeenCalledWith('https://api.example.com/chef', expect.anything());
    expect(result.source).toBe('api');
  });

  it('falls back to bundled data with a warning on HTTP errors', async () => {
    const fetchImpl = vi.fn().mockResolvedValue(jsonResponse({ message: 'nope' }, 503));
    const result = await loadCatalog({ apiUrl: 'https://api.example.com', fetchImpl });
    expect(result.source).toBe('bundled');
    expect(result.warning).toMatch(/503/);
  });

  it('falls back when the API returns an invalid shape', async () => {
    const fetchImpl = vi.fn().mockResolvedValue(jsonResponse([{ id: '1' }]));
    const result = await loadCatalog({ apiUrl: 'https://api.example.com', fetchImpl });
    expect(result.source).toBe('bundled');
    expect(result.warning).toMatch(/validation/i);
  });

  it('falls back on a network failure', async () => {
    const fetchImpl = vi.fn().mockRejectedValue(new TypeError('Failed to fetch'));
    const result = await loadCatalog({ apiUrl: 'https://api.example.com', fetchImpl });
    expect(result.source).toBe('bundled');
    expect(result.warning).toMatch(/Failed to fetch/);
  });
});
