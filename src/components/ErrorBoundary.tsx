import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Scrivly Editor Error:", error, errorInfo);
    this.props.onError?.(error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div
            className="scrivly-error-fallback"
            style={{
              padding: "20px",
              border: "1px solid #ef4444",
              borderRadius: "8px",
              backgroundColor: "#fef2f2",
              color: "#991b1b",
              textAlign: "center",
            }}
          >
            <h3 style={{ marginBottom: "8px" }}>Something went wrong</h3>
            <p style={{ fontSize: "14px", marginBottom: "16px" }}>
              The editor encountered an unexpected error.
            </p>
            <button
              onClick={() => this.setState({ hasError: false })}
              style={{
                padding: "8px 16px",
                backgroundColor: "#ef4444",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Try to reload
            </button>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
