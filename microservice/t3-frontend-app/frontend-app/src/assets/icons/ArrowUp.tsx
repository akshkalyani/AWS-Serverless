interface ArrowProps {
  color?: string;
  className?: string;
}

const ArrowUp: React.FC<ArrowProps> = ({ className }) => {
  return (
    <div>
      <svg
        className={`MuiSvgIcon-root MuiSvgIcon-fontSizeMedium MuiSelect-icon MuiSelect-iconOutlined MuiSelect-iconOpen css-d551zc-MuiSvgIcon-root-MuiSelect-icon ${className}`}
        focusable="false"
        aria-hidden="true"
        viewBox="0 0 24 24"
        data-testid="ArrowDropDownIcon"
      >
        <path d="M7 10l5 5 5-5z"></path>
      </svg>
    </div>
  );
};

export default ArrowUp;
