import { useAuth } from '../contexts/AuthContext.jsx';
import HeaderButton from './HeaderButton.jsx';
import HeaderIcon from './HeaderIcon.jsx';

const Header = ({ active, currentPath }) => {
  const { logout } = useAuth();
  console.log('Header rendered', currentPath.substring(1));
  // console.log('active', active);
  function handleLogout() {
    alert('logout');
  }
  return (
    <header id="header" className="header dark-background d-flex flex-column">
      <i className="header-toggle d-xl-none bi bi-list"></i>

      <div className="profile-img">
        <img
          src={'assets/img/my-profile-img.jpg'}
          alt=""
          className="img-fluid rounded-circle"
        />
      </div>

      <a
        href="/"
        className="logo d-flex align-items-center justify-content-center"
      >
        <img src="" alt="" />
        <h1 className="sitename">Alex Smith</h1>
      </a>

      <div className="social-links text-center">
        <HeaderIcon
          link={'/twitter'}
          iconClass={'twitter'}
          icon={'bi bi-twitter'}
        />
        {/* <a href="#" className="twitter">
          <i className="bi bi-twitter"></i>
        </a> */}
        <a href="#" className="facebook">
          <i className="bi bi-facebook"></i>
        </a>
        <a href="#" className="instagram">
          <i className="bi bi-instagram"></i>
        </a>
        <a href="#" className="google-plus">
          <i className="bi bi-skype"></i>
        </a>
        <a href="#" className="linkedin">
          <i className="bi bi-linkedin"></i>
        </a>
      </div>

      <nav id="navmenu" className="navmenu">
        <ul>
          <HeaderButton
            section="/"
            icon="bi bi-house navicon"
            text="Home"
            active={active}
            currentPath={currentPath}
            // onHandleActive={handleActive}
          />
          <HeaderButton
            section="about"
            icon="bi bi-person navicon"
            text="About"
            active={active}
            currentPath={currentPath}
            // onHandleActive={handleActive}
          />
          <HeaderButton
            section="resume"
            icon="bi bi-file-earmark-text navicon"
            text="Resume"
            active={active}
            currentPath={currentPath}
            // onHandleActive={handleActive}
          />
          <HeaderButton
            section="portfolio"
            icon="bi bi-images navicon"
            text="Portfolio"
            active={active}
            currentPath={currentPath}
            // onHandleActive={handleActive}
          />
          <HeaderButton
            section="services"
            icon="bi bi-hdd-stack navicon"
            text="Services"
            active={active}
            currentPath={currentPath}
            // onHandleActive={handleActive}
          />
          <HeaderButton
            section="contact"
            icon="bi bi-envelope navicon"
            text="Contact"
            active={active}
            currentPath={currentPath}
            // onHandleActive={handleActive}
          />
          <li>
            <a href="#" onClick={logout}>
              <i className="bi bi-envelope navicon"></i>
              Logout
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
