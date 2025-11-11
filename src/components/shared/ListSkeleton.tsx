import '@radix-ui/themes/styles.css';

import { Box, Flex, Skeleton } from '@radix-ui/themes';

type ListSkeletonProps = {
  count: number;
  width: number;
  height: number;
  gap: string;
  loading?: boolean;
};

const ListSkeleton = ({
  count,
  width,
  height,
  gap,
  loading = true,
}: ListSkeletonProps) => {
  return (
    <Flex direction="column" gap={gap} style={{ width }}>
      {Array.from({ length: count }).map((_, i) => (
        <Box key={i} style={{ width, height }}>
          <Skeleton
            loading={loading}
            style={{
              display: 'block',
              width: '100%',
              height: '100%',
              borderRadius: 8,
            }}
          />
        </Box>
      ))}
    </Flex>
  );
};

export default ListSkeleton;
