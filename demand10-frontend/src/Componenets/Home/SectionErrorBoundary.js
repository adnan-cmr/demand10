'use client';

import React from 'react';

export default class SectionErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error('Homepage section failed to render', { error, info });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="px-4 py-10 text-center text-gray-500">
          This section is temporarily unavailable. Please try again later.
        </div>
      );
    }
    return this.props.children;
  }
}
