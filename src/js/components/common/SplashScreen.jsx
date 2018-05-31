import React from 'react';

export default function SplashScreen({ isLoading, pastDelay, error }) {
  if (isLoading && pastDelay) {
    return (
      <div className="splash-screen text-center">
        Loading...
      </div>
    );
  } else if (error && !isLoading) {
    throw error;
  } else {
    return null;
  }
}
