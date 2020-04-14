import React from 'react';
import { ErrorResponse } from '../axios';

export function ErrorCard({ error }: { error: ErrorResponse }) {
  return (
    <div>
      <div>{error.ErrorMessage}</div>
      {error.ErrorContent && <div>{error.ErrorContent}</div>}
    </div>
  );
}
