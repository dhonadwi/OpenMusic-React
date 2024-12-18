import { useState } from 'react';

const HeaderButton = ({ section, icon, text, active }) => {
  return (
    <li>
      <a href={section} className={active === text ? 'active' : ''}>
        <i className={icon}></i>
        {text}
      </a>
    </li>
  );
};

export default HeaderButton;
