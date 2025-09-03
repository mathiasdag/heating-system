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
      className={`absolute ${positionClasses[position]} z-20 border border-black text-[10px] px-1.5 py-0.5 rounded-full font-sans text-sm! opacity-10 hover:opacity-100 transition-opacity`}
      title={`Component: ${componentName}`}
    >
      {componentName}
    </div>
  );
};
