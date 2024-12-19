const HeaderIcon = ({ link, iconClass, icon }) => {
  return (
    <a href={link} className={iconClass}>
      <i className={icon}></i>
    </a>
  );
};

export default HeaderIcon;
