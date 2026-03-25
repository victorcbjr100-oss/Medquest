document.addEventListener('DOMContentLoaded', () => {
    const sidebarHTML = `
    <aside class="w-64 bg-white border-r border-gray-100 flex flex-col fixed h-full z-20 overflow-y-auto">
        <div class="p-6 flex items-center gap-3">
            <div class="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-100">
                <i class="fas fa-brain text-xl"></i>
            </div>
            <div>
                <h1 class="font-bold text-gray-800 leading-tight">MedQuest</h1>
                <p class="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">Provas e Questões</p>
            </div>
        </div>

        <nav class="flex-1 px-4 space-y-1">
            <p class="text-[10px] font-bold text-gray-400 uppercase tracking-wider px-3 mb-2 mt-4">Navegação</p>
            
            <a href="index.html" class="nav-item flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-500 hover:bg-gray-50 rounded-xl transition-all">
                <i class="fas fa-home w-5"></i> Página Inicial
            </a>
            <a href="temas.html" class="nav-item flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-500 hover:bg-gray-50 rounded-xl transition-all">
                <i class="fas fa-layer-group w-5"></i> Temas
            </a>
            <a href="simulados.html" class="nav-item flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-500 hover:bg-gray-50 rounded-xl transition-all">
                <i class="fas fa-clock w-5"></i> Simulados
            </a>
            <a href="estatisticas.html" class="nav-item flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-500 hover:bg-gray-50 rounded-xl transition-all">
                <i class="fas fa-chart-bar w-5"></i> Estatísticas
            </a>
            <a href="favoritas.html" class="nav-item flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-500 hover:bg-gray-50 rounded-xl transition-all">
                <i class="far fa-star w-5"></i> Favoritas
            </a>
            <a href="caderno.html" class="nav-item flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-500 hover:bg-gray-50 rounded-xl transition-all">
                <i class="fas fa-edit w-5"></i> Meu Caderno
            </a>
            <a href="temas-quentes.html" class="nav-item flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-500 hover:bg-gray-50 rounded-xl transition-all">
                <i class="fas fa-fire w-5"></i> Temas Quentes
            </a>

            <p class="text-[10px] font-bold text-gray-400 uppercase tracking-wider px-3 mb-2 mt-6">Assinatura</p>
            <a href="planos.html" class="nav-item flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-500 hover:bg-gray-50 rounded-xl transition-all">
                <i class="fas fa-gem w-5"></i> Planos
            </a>

            <p class="text-[10px] font-bold text-gray-400 uppercase tracking-wider px-3 mb-2 mt-6">Admin</p>
            <a href="admin-usuarios.html" class="nav-item flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-500 hover:bg-gray-50 rounded-xl transition-all">
                <i class="fas fa-users-cog w-5"></i> Gerenciar Usuários
            </a>
            <a href="admin-questoes.html" class="nav-item flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-500 hover:bg-gray-50 rounded-xl transition-all">
                <i class="fas fa-tasks w-5"></i> Gerenciar Questões
            </a>
            <a href="importar.html" class="nav-item flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-500 hover:bg-gray-50 rounded-xl transition-all">
                <i class="fas fa-file-import w-5"></i> Importar Dados
            </a>
        </nav>

        <div class="p-4 border-t border-gray-100 mt-auto">
            <a href="perfil.html" class="flex items-center gap-3 px-2 py-2 rounded-xl hover:bg-blue-50 transition-all group">
                <div id="side-user-initial" class="w-9 h-9 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-xs">V</div>
                <div class="overflow-hidden flex-1">
                    <p id="side-user-name" class="text-xs font-bold text-gray-800 truncate">Dr. Victor</p>
                </div>
                <i class="fas fa-chevron-right text-[10px] text-gray-300 group-hover:text-blue-500"></i>
            </a>
        </div>
    </aside>
    `;

    document.body.insertAdjacentHTML('afterbegin', sidebarHTML);

    // Carregar nome salvo
    const dados = JSON.parse(localStorage.getItem('medquest_perfil'));
    if (dados && dados.nome) {
        document.getElementById('side-user-name').innerText = dados.nome;
        document.getElementById('side-user-initial').innerText = dados.nome.charAt(0).toUpperCase();
    }

    // Marca o link ativo
    const path = window.location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll('.nav-item').forEach(link => {
        if (link.getAttribute('href') === path) {
            link.classList.add('bg-blue-50', 'text-blue-600');
            link.classList.remove('text-gray-500');
        }
    });
});
