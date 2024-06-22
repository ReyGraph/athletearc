function navigateTo(page) {
    document.getElementById('content').src = `./components/${page}.html`;
  }
  
  document.getElementById('menu-memo').addEventListener('click', () => {
    navigateTo('memo');
  });
  
  document.getElementById('menu-todo').addEventListener('click', () => {
    navigateTo('todo');
  });
  
  document.getElementById('menu-gym').addEventListener('click', () => {
    navigateTo('gym');
  });
  
