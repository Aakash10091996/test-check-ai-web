import { Button } from "@/components/ui";
import { RestrictedIcon } from "@/icons";
import type { ReactNode } from "react";
import React, { Component } from "react";

/**
 * Props for the ErrorBoundary component.
 * @property {ReactNode} children - The children components that will be wrapped by the error boundary.
 * @property {string} fallbackText - The text to display in the fallback UI.
 */
interface ErrorBoundaryProps {
  children: ReactNode;
  fallbackText?: string;
  className?: string;
}

/**
 * State for the ErrorBoundary component.
 * @property {boolean} hasError - Indicates whether an error has been caught or not.
 */
interface ErrorBoundaryState {
  hasError: boolean;
}

/**
 * A component that acts as an error boundary to catch JavaScript errors in its child component tree,
 * log those errors, and provide a fallback UI.
 *
 * ### Example
 *
 * ```tsx
 * import ErrorBoundary from './ErrorBoundary';
 *
 * const App = () => {
 *   return (
 *     <ErrorBoundary fallbackText="Something went wrong!">
 *       <YourComponent />
 *     </ErrorBoundary>
 *   );
 * };
 *
 * export default App;
 * ```
 */
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);

    // Initialize the error state to false initially
    this.state = { hasError: false };
  }

  /**
   * A lifecycle method invoked after an error is thrown in a child component.
   * It updates the state to trigger a fallback UI.
   * @param {Error} error - The error that was thrown.
   * @returns {ErrorBoundaryState} - The updated state.
   */
  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Log the error to the console for debugging purposes
    console.error(error);
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  /**
   * A lifecycle method invoked after an error has been captured.
   * It can be used for additional error logging or reporting services.
   * @param {Error} error - The error that was thrown.
   * @param {React.ErrorInfo} info - Information about the error.
   */
  componentDidCatch(error: Error, info: React.ErrorInfo): void {
    // You can use your own error logging service here
    console.error(error, info.componentStack);
  }

  /**
   * Renders the children components if there's no error, otherwise displays fallback UI.
   * @returns {ReactNode} - The rendered fallback or children components.
   */
  render(): ReactNode {
    // Check if an error has occurred
    if (this.state.hasError) {
      // Provide a default fallback message if not specified in props
      const fallbackText = this.props.fallbackText ?? "Oops, there is an error!";

      // Render the fallback UI
      return (
        <div className={this.props.className}>
          <div className="mb-5 flex items-center gap-3 ">
            <RestrictedIcon height={18} width={18} />
            <h2 className="font-bold">{fallbackText}</h2>
          </div>
          <Button
            type="button"
            className="bg-red text-white hover:bg-red700"
            onClick={() => this.setState({ hasError: false })}
          >
            Try again?
          </Button>
        </div>
      );
    }

    // Render children components if there's no error
    return this.props.children;
  }
}

export default ErrorBoundary;
