import { Component, type ErrorInfo, type ReactNode } from 'react';
import { Div, Title, Text } from '@vkontakte/vkui';

interface Props {
  children?: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <Div style={{ padding: 20, textAlign: 'center' }}>
          <Title level="2">Что-то пошло не так</Title>
          <Text>Компонент временно недоступен из-за астральных помех.</Text>
        </Div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
