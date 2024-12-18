const HeaderButton = ({ section, icon, text, active, onHandleActive }) => {
  return (
    <li>
      <a
        href={section}
        className={active === text ? 'active' : ''}
        onClick={() => onHandleActive(text)}
      >
        <i className={icon}></i>
        {text}
      </a>
    </li>
  );
};

export default HeaderButton;
