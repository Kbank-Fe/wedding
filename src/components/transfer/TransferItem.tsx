import type { ReactNode } from 'react';

type TransferProps = {
  title?: string;
  description?: ReactNode;
};

const TransferItem = ({ title, description }: TransferProps) => {
  return (
    <div>
      {title && <h2>{title}</h2>}
      {description}
    </div>
  );
};

export default TransferItem;
