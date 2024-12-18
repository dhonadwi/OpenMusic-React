const ProgressBar = ({ value }) => {
  return <progress value={value} max={100} style={{ width: '100%' }} />;
};

export default ProgressBar;
