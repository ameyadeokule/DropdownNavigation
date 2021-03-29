import './dropdown.css'
import { ReactComponent as BellIcon } from './icons/bell.svg'
import { ReactComponent as MessengerIcon } from './icons/messenger.svg'
import { ReactComponent as CaretIcon } from './icons/caret.svg'
import { ReactComponent as PlusIcon } from './icons/plus.svg'
import { ReactComponent as CogIcon } from './icons/cog.svg'
import { ReactComponent as ChevronIcon } from './icons/chevron.svg'
import { ReactComponent as ArrowIcon } from './icons/arrow.svg'
import { MdHelp } from 'react-icons/md'
import { SiGnuprivacyguard } from 'react-icons/si'
import { BsNewspaper, BsFillInboxesFill } from 'react-icons/bs'
import { CgProfile } from 'react-icons/cg'
import { FiActivity } from 'react-icons/fi'
import { FaLanguage } from 'react-icons/fa'
import { FcSupport } from 'react-icons/fc'
import { GoReport } from 'react-icons/go'
import React, { useState, useEffect, useRef } from 'react'
import { CSSTransition } from 'react-transition-group'

function DropdownNav() {
  return (
    <Navbar>
      <NavItem icon={<PlusIcon />} />
      <NavItem icon={<BellIcon />} />
      <NavItem icon={<MessengerIcon />} />

      <NavItem icon={<CaretIcon />}>
        <DropdownMenu></DropdownMenu>
      </NavItem>
    </Navbar>
  )
}

function Navbar(props) {
  return (
    <nav className='navbar'>
      <ul className='navbar-nav'>{props.children}</ul>
    </nav>
  )
}

function NavItem(props) {
  const [open, setOpen] = useState(false)

  return (
    <li className='nav-item'>
      {/* eslint-disable-next-line */}
      <a href='#' className='icon-button' onClick={() => setOpen(!open)}>
        {props.icon}
      </a>

      {open && props.children}
    </li>
  )
}

function DropdownMenu() {
  const [activeMenu, setActiveMenu] = useState('main')
  const [menuHeight, setMenuHeight] = useState(null)
  const dropdownRef = useRef(null)

  useEffect(() => {
    setMenuHeight(dropdownRef.current?.firstChild.offsetHeight)
  }, [])

  function calcHeight(el) {
    const height = el.offsetHeight
    setMenuHeight(height)
  }

  function DropdownItem(props) {
    return (
      // eslint-disable-next-line
      <a
        href='#'
        className='menu-item'
        onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}>
        <span className='icon-button'>{props.leftIcon}</span>
        {props.children}
        <span className='icon-right'>{props.rightIcon}</span>
      </a>
    )
  }

  return (
    <div className='dropdown' style={{ height: menuHeight }} ref={dropdownRef}>
      <CSSTransition
        in={activeMenu === 'main'}
        timeout={500}
        classNames='menu-primary'
        unmountOnExit
        onEnter={calcHeight}>
        <div className='menu'>
          <DropdownItem leftIcon={<CgProfile />}>My Profile</DropdownItem>
          <DropdownItem
            leftIcon={<CogIcon />}
            rightIcon={<ChevronIcon />}
            goToMenu='settings'>
            Settings
          </DropdownItem>
          <DropdownItem
            leftIcon={<FcSupport style={{ color: 'white' }} />}
            rightIcon={<ChevronIcon />}
            goToMenu='help'>
            Help & Support
          </DropdownItem>
        </div>
      </CSSTransition>

      <CSSTransition
        in={activeMenu === 'settings'}
        timeout={500}
        classNames='menu-secondary'
        unmountOnExit
        onEnter={calcHeight}>
        <div className='menu'>
          <DropdownItem goToMenu='main' leftIcon={<ArrowIcon />}>
            <h2>Settings</h2>
          </DropdownItem>
          <DropdownItem leftIcon={<SiGnuprivacyguard />}>Privacy</DropdownItem>
          <DropdownItem leftIcon={<BsNewspaper />}>News Feed</DropdownItem>
          <DropdownItem leftIcon={<FiActivity />}>Activity</DropdownItem>
          <DropdownItem leftIcon={<FaLanguage />}>Language</DropdownItem>
        </div>
      </CSSTransition>

      <CSSTransition
        in={activeMenu === 'help'}
        timeout={500}
        classNames='menu-secondary'
        unmountOnExit
        onEnter={calcHeight}>
        <div className='menu'>
          <DropdownItem goToMenu='main' leftIcon={<ArrowIcon />}>
            <h2>Help & Support</h2>
          </DropdownItem>
          <DropdownItem leftIcon={<MdHelp />}>Help Center</DropdownItem>
          <DropdownItem leftIcon={<BsFillInboxesFill />}>
            Support Inbox
          </DropdownItem>
          <DropdownItem leftIcon={<GoReport />}>Report a Problem</DropdownItem>
        </div>
      </CSSTransition>
    </div>
  )
}

export default DropdownNav
