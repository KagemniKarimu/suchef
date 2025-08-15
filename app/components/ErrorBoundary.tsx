"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import * as motion from "motion/react-client";
import { Howl } from "howler";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  resetKeys?: Array<string | number>;
  resetOnPropsChange?: boolean;
  isolate?: boolean; // If true, only shows error for this component, not whole page
  name?: string; // For debugging - which boundary caught the error
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  private failSound: Howl | null = null;

  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
    
    this.failSound = new Howl({
      src: ["/media/ping_fail.mp3"],
      volume: 0.5,
      preload: true,
    });
  }

  componentWillUnmount() {
    this.failSound?.unload();
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.failSound?.play();
    console.error(
      `ErrorBoundary ${this.props.name || "unnamed"} caught:`,
      error,
      errorInfo,
    );

    // Call optional error handler (for logging to services like Sentry)
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  componentDidUpdate(prevProps: Props) {
    const { resetKeys, resetOnPropsChange } = this.props;
    const { hasError } = this.state;

    if (hasError && prevProps.resetKeys !== resetKeys) {
      if (resetKeys?.some((key, idx) => key !== prevProps.resetKeys?.[idx])) {
        this.resetErrorBoundary();
      }
    }

    if (
      hasError &&
      resetOnPropsChange &&
      prevProps.children !== this.props.children
    ) {
      this.resetErrorBoundary();
    }
  }

  resetErrorBoundary = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return <>{this.props.fallback}</>;
      }

      // Default error UI
      const errorUI = (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`${
            this.props.isolate
              ? "p-6 rounded-lg"
              : "min-h-screen flex items-center justify-center p-6"
          }`}
        >
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-xl shadow-red-500/10 p-8 border border-red-500/30 max-w-md w-full">
            <div className="text-center">
              <div className="text-5xl mb-4">🍳💔</div>
              <h2 className="text-2xl font-bold text-gray-100 mb-2">
                Oops! Something went burnt!
              </h2>
              <p className="text-gray-400 mb-6">
                {this.props.isolate
                  ? "This recipe section had a mishap."
                  : "The kitchen encountered an unexpected error."}
              </p>

              <div className="bg-gray-900/50 rounded-lg p-3 mb-6">
                <p className="text-sm text-red-400 font-mono">
                  {this.state.error?.message || "Unknown error"}
                </p>
              </div>

              <button
                onClick={this.resetErrorBoundary}
                className="bg-gradient-to-r from-orange-500 to-pink-500 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                Try Again
              </button>

              {!this.props.isolate && (
                <button
                  onClick={() => (window.location.href = "/")}
                  className="block w-full mt-3 text-gray-400 hover:text-gray-300 text-sm"
                >
                  Return to Home
                </button>
              )}
            </div>
          </div>
        </motion.div>
      );

      return errorUI;
    }

    return this.props.children;
  }
}
