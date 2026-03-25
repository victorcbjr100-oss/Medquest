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
            
            <a href="index.html" class="nav-item flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-500 hover:bg-gray-50 rounded-xl transition-all" data-page="index">
                <i class="fas fa-home w-5"></i> Página Inicial
            </a>
            <a href="temas.html" class="nav-item flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-500 hover:bg-gray-50 rounded-xl transition-all" data-page="temas">
                <i class="fas fa-layer-group w-5"></i> Temas
            </a>
            <a href="#" class="nav-item flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-500 hover:bg-gray-50 rounded-xl transition-all">
                <i class="fas fa-clock w-5"></i> Simulados
            </a>
            <a href="#" class="nav-item flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-500 hover:bg-gray-50 rounded-xl transition-all">
                <i class="fas fa-chart-bar w-5"></i> Estatísticas
            </a>
            <a href="#" class="nav-item flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-500 hover:bg-gray-50 rounded-xl transition-all">
                <i class="far fa-star w-5"></i> Favoritas
            </a>
            <a href="#" class="nav-item flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-500 hover:bg-gray-50 rounded-xl transition-all">
                <i class="fas fa-edit w-5"></i> Meu Caderno
            </a>
            <a href="#" class="nav-item flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-500 hover:bg-gray-50 rounded-xl transition-all">
                <i class="fas fa-fire w-5"></i> Temas Quentes
            </a>

            <p class="text-[10px] font-bold text-gray-400 uppercase tracking-wider px-3 mb-2 mt-6">Assinatura</p>
            <a href="#" class="nav-item flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-500 hover:bg-gray-50 rounded-xl transition-all">
                <i class="fas fa-gem w-5"></i> Planos
            </a>

            <p class="text-[10px] font-bold text-gray-400 uppercase tracking-wider px-3 mb-2 mt-6">Admin</p>
            <a href="#" class="nav-item flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-500 hover:bg-gray-50 rounded-xl transition-all">
                <i class="fas fa-users-cog w-5"></i> Gerenciar Usuários
            </a>
            <a href="#" class="nav-item flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-500 hover:bg-gray-50 rounded-xl transition-all">
                <i class="fas fa-tasks w-5"></i> Gerenciar Questões
            </a>
            <a href="#" class="nav-item flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-500 hover:bg-gray-50 rounded-xl transition-all">
                <i class="fas fa-plus-circle w-5"></i> Criar Temas/Provas
            </a>
            <a href="#" class="nav-item flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-500 hover:bg-gray-50 rounded-xl transition-all">
                <i class="fas fa-folder-open w-5"></i> Gerenciar Temas
            </a>
            <a href="#" class="nav-item flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-500 hover:bg-gray-50 rounded-xl transition-all">
                <i class="fas fa-file-import w-5"></i> Importar Dados
            </a>
            <a href="#" class="nav-item flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-red-500 hover:bg-red-50 rounded-xl transition-all">
                <i class="fas fa-trash-alt w-5"></i> Limpar Dados
            </a>
        </nav>

        <div class="p-4 border-t border-gray-100 mt-6 mb-2">
            <a href="perfil.html" class="flex items-center gap-3 px-2 py-2 rounded-xl hover:bg-blue-50 transition-all group">
                <div id="side-user-initial" class="w-9 h-9 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-xs border-2 border-white shadow-sm">
                    V
                </div>
                <div class="overflow-hidden flex-1">
                    <p id="side-user-name" class="text-xs font-bold text-gray-800 truncate">Victor Hugo</p>
                    <p id="side-user-email" class="text-[9px] text-gray-400 truncate">victorcbjr100@gm...</p>
                </div>
                <i class="fas fa-chevron-right text-[10px] text-gray-300 group-hover:text-blue-500 transition-colors"></i>
            </a>
        </div>
    </aside>
    `;

    // Injeta a sidebar no início do body
    document.body.insertAdjacentHTML('afterbegin', sidebarHTML);

    // Carrega dados do perfil salvos
    const dados = JSON.parse(localStorage.getItem('medquest_perfil'));
    if (dados) {
        if (dados.nome) {
            document.getElementById('side-user-name').innerText = dados.nome;
            document.getElementById('side-user-initial').innerText = dados.nome.charAt(0).toUpperCase();
        }
        if (dados.email) {
            document.getElementById('side-user-email').innerText = dados.email;
        }
    }

    // Marca o link ativo conforme a página
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll('.nav-item').forEach(item => {
        if(item.getAttribute('href') === currentPage) {
            item.classList.add('bg-blue-50', 'text-blue-600');
            item.classList.remove('text-gray-500');
        }
    });
});
