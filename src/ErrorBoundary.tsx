import { Component, type PropsWithChildren } from 'react';

export class ErrorBoundary extends Component<PropsWithChildren<unknown>> {
  state: { hasError: boolean };
  constructor(props: { children: JSX.Element }) {
    super(props);
    this.state = {
      hasError: false,
    };
  }
  componentDidCatch(error: Error): void {
    alert(error);
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return <h2> Ooops! Somethisn went wrong....</h2>;
    }
    return this.props.children;
  }
}
