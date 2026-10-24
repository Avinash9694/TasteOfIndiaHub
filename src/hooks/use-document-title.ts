import { useEffect } from 'react';

const SUFFIX = 'Taste of India Hub';

export function useDocumentTitle(title?: string, description?: string) {
  useEffect(() => {
    document.title = title
      ? `${title} · ${SUFFIX}`
      : `${SUFFIX} — Indian recipes from chefs you know`;
    if (description) {
      document.querySelector('meta[name="description"]')?.setAttribute('content', description);
    }
  }, [title, description]);
}
