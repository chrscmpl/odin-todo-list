import 'normalize.css';
import './index.css';

import Header from './components/header/header';
import Sidebar from './components/sidebar/sidebar';
import Main from './components/main/main';
import Footer from './components/footer/footer';

document.querySelector(':root').setAttribute('lang', 'en');

const content = document.createElement('div');
content.id = 'content';

content.appendChild(Header());
content.appendChild(Sidebar());
content.appendChild(Main());
content.appendChild(Footer());

document.body.appendChild(content);
