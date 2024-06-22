function navigateTo(page) {
  document.getElementById('content').src = `./components/${page}.html`;
}

function addMenuClickListener(menuId, page) {
  document.getElementById(menuId).addEventListener('click', () => {
    navigateTo(page);
  });
}

addMenuClickListener('menu-memo', 'memo');
addMenuClickListener('menu-todo', 'todo');
addMenuClickListener('menu-gym', 'gym');
