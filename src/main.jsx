import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import pages from './pages.json';
import './portfolio.css';

const pageName = (location.pathname.split('/').pop() || 'index.html').replace(/\.html$/, '');
const page = pages[pageName] || pages.index;

function Portfolio() {
  useEffect(() => {
    document.title = page.title;
    document.body.className = page.bodyClass;
    const toggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav-links');
    const dropdownButton = document.querySelector('#dropdownBtn');
    const dropdownMenu = document.querySelector('#dropdownMenu');
    const dropdownArrow = document.querySelector('#dropdownArrow');
    const closeDropdown = () => {
      dropdownMenu?.classList.remove('show');
      dropdownButton?.setAttribute('aria-expanded', 'false');
      if (dropdownArrow) dropdownArrow.textContent = '▼';
    };
    const onToggle = () => {
      const open = nav?.classList.toggle('open');
      toggle?.setAttribute('aria-expanded', String(!!open));
    };
    const onDropdown = (event) => {
      event.stopPropagation();
      const open = dropdownMenu?.classList.toggle('show');
      dropdownButton?.setAttribute('aria-expanded', String(!!open));
      if (dropdownArrow) dropdownArrow.textContent = open ? '▲' : '▼';
    };
    const onDocumentClick = (event) => {
      if (!event.target.closest('.nav-dropdown')) closeDropdown();
    };
    const onNavClick = () => {
      nav?.classList.remove('open');
      toggle?.setAttribute('aria-expanded', 'false');
      closeDropdown();
    };
    toggle?.addEventListener('click', onToggle);
    dropdownButton?.addEventListener('click', onDropdown);
    document.addEventListener('click', onDocumentClick);
    const links = [...(nav?.querySelectorAll('a') || [])];
    links.forEach(link => link.addEventListener('click', onNavClick));
    return () => {
      toggle?.removeEventListener('click', onToggle);
      dropdownButton?.removeEventListener('click', onDropdown);
      document.removeEventListener('click', onDocumentClick);
      links.forEach(link => link.removeEventListener('click', onNavClick));
    };
  }, []);
  // Original HTML remains byte-for-byte equivalent in its visible layout.
  return <div dangerouslySetInnerHTML={{ __html: page.body }} />;
}

createRoot(document.getElementById('root')).render(<Portfolio />);
