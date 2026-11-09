import React from 'react';

const labels = {
  oral: 'Oral',
  spotlight: 'Spotlight',
  cover: 'Cover Article',
};

const starIcon = (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      d="M12 2l2.9 6.6 7.1.6-5.4 4.7 1.6 7L12 17.2 5.8 20.9l1.6-7L2 9.2l7.1-.6z"
      fill="currentColor"
    />
  </svg>
);

export default function PresentationBadge({ presentation }) {
  const label = labels[(presentation || '').toLowerCase()];
  if (!label) return null;
  return (
    <span className="presentation-badge">
      {starIcon}
      {label}
    </span>
  );
}
