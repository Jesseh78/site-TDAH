// Timer de Foco (Pomodoro)
(function focusTimer() {
  const clock = document.getElementById('clock');
  const status = document.getElementById('status');
  const startBtn = document.getElementById('startBtn');
  const pauseBtn = document.getElementById('pauseBtn');
  const resetBtn = document.getElementById('resetBtn');
  
  let total = 25 * 60; // 25 minutos
  let remaining = total;
  let int = null;

  function render() {
    const m = Math.floor(remaining / 60).toString().padStart(2, '0');
    const s = (remaining % 60).toString().padStart(2, '0');
    clock.textContent = `${m}:${s}`;
  }

  function tick() {
    if (remaining > 0) {
      remaining--;
      render();
    } else {
      clearInterval(int);
      int = null;
      status.textContent = 'Concluído! Faça uma pausa.';
      // Notificação sonora (opcional)
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('Timer Concluído!', {
          body: 'Hora de fazer uma pausa!',
          icon: '/favicon.ico'
        });
      }
    }
  }

  startBtn.addEventListener('click', () => {
    if (int) return; // já está rodando
    status.textContent = 'Focando…';
    int = setInterval(tick, 1000);
  });

  pauseBtn.addEventListener('click', () => {
    if (!int) return;
    clearInterval(int);
    int = null;
    status.textContent = 'Pausado';
  });

  resetBtn.addEventListener('click', () => {
    clearInterval(int);
    int = null;
    remaining = total;
    render();
    status.textContent = 'Pronto para focar';
  });

  // Inicializar
  render();
})();

// Checklist com localStorage
(function checklist() {
  const key = 'tdah-todo-v1';
  const todo = document.getElementById('todo');
  const newItem = document.getElementById('newItem');
  const addItem = document.getElementById('addItem');
  const clearDone = document.getElementById('clearDone');
  const clearAll = document.getElementById('clearAll');
  const count = document.getElementById('count');

  let items = [];
  try {
    items = JSON.parse(localStorage.getItem(key)) || [];
  } catch {
    items = [];
  }

  function save() {
    localStorage.setItem(key, JSON.stringify(items));
  }

  function render() {
    todo.innerHTML = '';
    let pending = 0;
    
    items.forEach((it, idx) => {
      const li = document.createElement('li');
      const cb = document.createElement('input');
      cb.type = 'checkbox';
      cb.checked = !!it.done;
      cb.id = 'c' + idx;
      
      const label = document.createElement('label');
      label.htmlFor = cb.id;
      label.textContent = it.text;
      label.style.flex = '1';
      
      // Adicionar classe para tarefas concluídas
      if (it.done) {
        li.classList.add('completed');
      }
      
      cb.addEventListener('change', () => {
        it.done = cb.checked;
        if (it.done) {
          li.classList.add('completed');
        } else {
          li.classList.remove('completed');
        }
        save();
        render();
      });
      
      const del = document.createElement('button');
      del.textContent = 'Excluir';
      del.className = 'danger';
      del.style.marginLeft = 'auto';
      
      del.addEventListener('click', () => {
        if (confirm('Tem certeza que deseja excluir esta tarefa?')) {
          items.splice(idx, 1);
          save();
          render();
        }
      });
      
      li.append(cb, label, del);
      todo.appendChild(li);
      
      if (!it.done) pending++;
    });
    
    count.textContent = `${pending} pendente${pending === 1 ? '' : 's'}`;
  }

  addItem.addEventListener('click', () => {
    const t = (newItem.value || '').trim();
    if (!t) {
      newItem.focus();
      return;
    }
    items.unshift({ text: t, done: false });
    newItem.value = '';
    save();
    render();
  });

  newItem.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      addItem.click();
    }
  });

  clearDone.addEventListener('click', () => {
    if (confirm('Limpar todas as tarefas concluídas?')) {
      items = items.filter(i => !i.done);
      save();
      render();
    }
  });

  clearAll.addEventListener('click', () => {
    if (confirm('Apagar todas as tarefas? Esta ação não pode ser desfeita.')) {
      items = [];
      save();
      render();
    }
  });

  // Inicializar
  render();
})();

// Funcionalidade original dos recursos
(function recursos() {
  const frases = [
    "Aqui podemos colocar contatos importantes, guias e medidas(algo definitivamente util KKK)",
    "Links para especialistas em TDAH",
    "Aplicativos recomendados para organização",
    "Grupos de apoio e comunidades online"
  ];

  document.getElementById('mostrarFrase').addEventListener('click', () => {
    const frase = frases[Math.floor(Math.random() * frases.length)];
    document.getElementById('frase').textContent = frase;
  });
})();

// Solicitar permissão para notificações
if ('Notification' in window) {
  Notification.requestPermission();
}
