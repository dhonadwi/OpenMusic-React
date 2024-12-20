import { Link } from 'react-router-dom';

const HeaderButton = ({
  section,
  icon,
  text,
  active,
  currentPath = { currentPath },
}) => {
  return (
    <li>
      <Link
        to={section}
        className={
          currentPath.toLowerCase().substring(1) === text.toLowerCase() ||
          (text.toLowerCase() === 'home' && currentPath.toLowerCase() === '/')
            ? 'active'
            : ''
        }
      >
        <i className={icon}></i>
        {text}
      </Link>
    </li>
  );
};

export default HeaderButton;
