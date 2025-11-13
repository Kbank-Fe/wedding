import '@radix-ui/themes/styles.css';

import { css, type SerializedStyles } from '@emotion/react';
import { Box, Flex, Skeleton } from '@radix-ui/themes';

type ListSkeletonProps = {
  count?: number;
  loading?: boolean;
  containerStyle?: SerializedStyles;
  itemStyle?: SerializedStyles;
};
const ListSkeleton = ({
  count = 8,
  loading = true,
  containerStyle,
  itemStyle,
}: ListSkeletonProps) => {
  return (
    <Flex css={[defaultContainerStyle, containerStyle]} direction="column">
      {Array.from({ length: count }).map((_, index) => (
        <Box key={index} css={[defaultItemStyle, itemStyle]}>
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
const defaultContainerStyle = css`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
const defaultItemStyle = css`
  width: 100%;
  height: 48.3px;
`;
export default ListSkeleton;
