type InputProps = {
  labelText?: string;
  children: React.ReactNode;
};

const Input = ({ labelText, children }: InputProps) => {
  return (
    <div css={wrapperStyle}>
      <div>
        <label css={labelStyle}>{labelText}</label>
      </div>
      <div css={childrenStyle}>{children}</div>
    </div>
  );
};

const wrapperStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
};

const labelStyle = {
  flex: '0 0 30%', // 고정 비율 30%
};

const childrenStyle = {
  flex: 1, // 남은 공간 전부 차지
};

export default Input;
