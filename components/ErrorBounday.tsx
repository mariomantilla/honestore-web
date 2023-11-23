import React, { Component, ErrorInfo, ReactNode } from "react";
import ErrorTracker from "../lib/errorTracking";

interface Props {
  tracker: ErrorTracker;
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.props.tracker.handleErrorEvent("", undefined, undefined, undefined, error)
  }

  public render() {
    // Check if the error is thrown
    if (this.state.hasError) {
        // You can render any custom fallback UI
        return (
          <div style={{width: "100vw", height: "100vh", textAlign: "center", paddingTop: "30vh"}}>
            <h2>Oops, hubo un error!</h2>
            <button
              type="button"
              onClick={() => this.setState({ hasError: false })}
            >
              Probar de nuevo?
            </button>
          </div>
        )
    } else {
      return this.props.children;
    }
  }
}

export default ErrorBoundary;