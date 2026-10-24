import { Button } from '@/components/button';
import { ShareIcon } from '@/components/icons';
import { toast } from '@/store/toast';

type Props = { title: string; text: string };

export function ShareButton({ title, text }: Props) {
  const share = async () => {
    const url = window.location.href;
    try {
      if (typeof navigator.share === 'function') {
        await navigator.share({ title, text, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      toast.success('Link copied to clipboard.');
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') return;
      toast.error('Could not share this recipe.');
    }
  };

  return (
    <Button variant="secondary" onClick={share}>
      <ShareIcon /> Share
    </Button>
  );
}
