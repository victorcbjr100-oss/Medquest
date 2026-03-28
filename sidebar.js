// sidebar.js
document.addEventListener("DOMContentLoaded", function() {
    const sidebarHTML = `
    <aside class="w-64 bg-white border-r border-gray-100 flex flex-col fixed h-full z-50">
        <div class="p-6 flex items-center gap-3">
            <div class="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg">
                <i class="fas fa-brain text-xl"></i>
            </div>
            <div>
                <h1 class="font-bold text-gray-800 leading-tight tracking-tighter text-lg">MedQuest</h1>
                <p class="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Provas e Questões</p>
            </div>
        </div>

        <nav class="flex-1 px-4 mt-4 space-y-1 overflow-y-auto">
            <p class="text-[10px] font-bold text-gray-300 uppercase tracking-widest px-3 mb-2">Navegação</p>
            
            <a href="index.html" class="nav-link flex items-center gap-3 px-3 py-2.5 text-sm font-semibold text-gray-500 hover:bg-gray-50 rounded-xl transition-all">
                <i class="fas fa-home w-5"></i> Página Inicial
            </a>
            
            <a href="temas.html" class="nav-link flex items-center gap-3 px-3 py-2.5 text-sm font-semibold text-gray-500 hover:bg-gray-50 rounded-xl transition-all">
                <i class="fas fa-layer-group w-5"></i> Temas
            </a>

            <a href="simulados.html" class="nav-link flex items-center gap-3 px-3 py-2.5 text-sm font-semibold text-gray-500 hover:bg-gray-50 rounded-xl transition-all">
                <i class="fas fa-stopwatch w-5"></i> Simulados
            </a>

            <a href="favoritas.html" class="nav-link flex items-center gap-3 px-3 py-2.5 text-sm font-semibold text-gray-500 hover:bg-gray-50 rounded-xl transition-all">
                <i class="fas fa-star w-5"></i> Favoritas
            </a>

            <a href="caderno.html" class="nav-link flex items-center gap-3 px-3 py-2.5 text-sm font-semibold text-gray-500 hover:bg-gray-50 rounded-xl transition-all">
                <i class="fas fa-book-medical w-5"></i> Meu Caderno
            </a>

            <div class="pt-6">
                <p class="text-[10px] font-bold text-gray-300 uppercase tracking-widest px-3 mb-2">Admin</p>
                <a href="gerenciar-usuarios.html" class="nav-link flex items-center gap-3 px-3 py-2.5 text-sm font-semibold text-gray-500 hover:bg-gray-50 rounded-xl transition-all">
                    <i class="fas fa-users w-5"></i> Usuários
                </a>
                <a href="gerenciar-questoes.html" class="nav-link flex items-center gap-3 px-3 py-2.5 text-sm font-semibold text-gray-500 hover:bg-gray-50 rounded-xl transition-all">
                    <i class="fas fa-tasks w-5"></i> Questões
                </a>
            </div>
        </nav>

        <div class="p-4 border-t border-gray-50">
            <div onclick="window.location.href='perfil.html'" class="flex items-center gap-3 p-2 rounded-2xl bg-gray-50/50 border border-transparent hover:border-blue-100 hover:bg-blue-50 transition-all cursor-pointer group">
                <div id="sidebar-avatar" class="w-9 h-9 bg-blue-600 text-white rounded-xl flex items-center justify-center font-bold text-sm shadow-sm overflow-hidden">
                    V
                </div>
                <div class="flex-1 min-w-0">
                    <p class="text-xs font-black text-gray-800 truncate" id="sidebar-user-name">Dr. Victor</p>
                    <p class="text-[9px] text-blue-500 font-bold uppercase" id="sidebar-user-tag">Plano Premium</p>
                </div>
                <i class="fas fa-cog text-gray-300 group-hover:text-blue-500 text-xs transition-colors"></i>
            </div>
        </div>
    </aside>`;

    document.body.insertAdjacentHTML('afterbegin', sidebarHTML);

    // Lógica de Sincronização em Tempo Real
    function atualizarUI() {
        const dados = JSON.parse(localStorage.getItem('medquest_perfil')) || {};
        if (dados.nome) document.getElementById('sidebar-user-name').innerText = dados.nome;
        if (dados.categoria) document.getElementById('sidebar-user-tag').innerText = dados.categoria;
        if (dados.foto) {
            document.getElementById('sidebar-avatar').innerHTML = `<img src="${dados.foto}" class="w-full h-full object-cover">`;
        } else if (dados.nome) {
            document.getElementById('sidebar-avatar').innerText = dados.nome.charAt(0).toUpperCase();
        }
    }

    atualizarUI();
});
