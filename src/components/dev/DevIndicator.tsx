interface DevIndicatorProps {
  componentName: string;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

export const DevIndicator: React.FC<DevIndicatorProps> = ({
  componentName,
  position = 'top-left',
}) => {
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  const positionClasses = {
    'top-left': 'top-1 left-1',
    'top-right': 'top-1 right-1',
    'bottom-left': 'bottom-1 left-1',
    'bottom-right': 'bottom-1 right-1',
  };

  return (
    <div
      className={`absolute select-none ${positionClasses[position]} z-20 border border-text text-xs px-0.5 pt-0.5 rounded-md font-sans opacity-10 mix-blend-difference hover:opacity-100 hover:bg-text hover:text-bg transition-opacity`}
      title={`Component: ${componentName}`}
    >
      {componentName}
    </div>
  );
};
