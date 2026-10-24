import { Component, type ErrorInfo, type ReactNode } from 'react';
import { Button } from './button';
import { ErrorState } from './states';

type State = { error: Error | null };

export class ErrorBoundary extends Component<{ children: ReactNode }, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(error, info.componentStack);
  }

  render() {
    if (!this.state.error) return this.props.children;
    return (
      <div className="container-x py-16">
        <ErrorState
          title="Something went wrong"
          description="The page hit an unexpected error. Reloading usually fixes it."
          action={<Button onClick={() => window.location.reload()}>Reload</Button>}
        />
      </div>
    );
  }
}
