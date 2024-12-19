const HeaderButton = ({
  section,
  icon,
  text,
  active,
  currentPath = { currentPath },
}) => {
  console.log(
    `text: ${text.toLowerCase()}, currentPath: ${currentPath.toLowerCase()}`
  );
  console.log('button', currentPath.toLowerCase() === text.toLowerCase());
  return (
    <li>
      <a
        href={section}
        className={
          currentPath.toLowerCase().substring(1) === text.toLowerCase() ||
          (text.toLowerCase() === 'home' && currentPath.toLowerCase() === '/')
            ? 'active'
            : ''
        }
      >
        <i className={icon}></i>
        {text}
      </a>
    </li>
  );
};

export default HeaderButton;
