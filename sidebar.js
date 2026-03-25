// sidebar.js
document.addEventListener('DOMContentLoaded', () => {
    const sidebarHTML = `
    <aside class="w-64 bg-white border-r border-gray-100 flex flex-col fixed h-full z-10">
        <div class="p-6 flex items-center gap-3">
            <div class="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg">
                <i class="fas fa-brain text-xl"></i>
            </div>
            <div>
                <h1 class="font-bold text-gray-800 leading-tight">MedQuest</h1>
                <p class="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">Provas e Questões</p>
            </div>
        </div>
        <nav class="flex-1 px-4 mt-4 space-y-1">
            <a href="index.html" class="nav-item flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-500 hover:bg-gray-50 rounded-xl transition-all" data-page="index">
                <i class="fas fa-home w-5"></i> Dashboard
            </a>
            <a href="temas.html" class="nav-item flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-500 hover:bg-gray-50 rounded-xl transition-all" data-page="temas">
                <i class="fas fa-layer-group w-5"></i> Temas
            </a>
            <a href="estatisticas.html" class="nav-item flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-500 hover:bg-gray-50 rounded-xl transition-all" data-page="estatisticas">
                <i class="fas fa-chart-bar w-5"></i> Estatísticas
            </a>
        </nav>
        
        <div class="p-4 border-t border-gray-50 mt-auto">
            <a href="perfil.html" class="flex items-center gap-3 px-2 py-2 rounded-xl hover:bg-gray-50 transition-all group">
                <div id="sidebar-user-initial" class="w-9 h-9 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-xs border-2 border-white shadow-sm group-hover:scale-105 transition-transform">
                    U
                </div>
                <div class="flex-1 min-w-0">
                    <p id="sidebar-user-name" class="text-xs font-bold text-gray-800 truncate">Carregando...</p>
                    <p class="text-[9px] text-gray-400 font-medium uppercase tracking-tighter">Meu Perfil</p>
                </div>
                <i class="fas fa-chevron-right text-[10px] text-gray-300 group-hover:text-blue-500 transition-colors"></i>
            </a>
        </div>
    </aside>
    `;

    // Injeta o HTML no início do body ou em um container específico
    document.body.insertAdjacentHTML('afterbegin', sidebarHTML);

    // Atualiza os dados do usuário dinamicamente
    const dadosPerfil = JSON.parse(localStorage.getItem('medquest_perfil'));
    if (dadosPerfil && dadosPerfil.nome) {
        document.getElementById('sidebar-user-name').innerText = dadosPerfil.nome;
        document.getElementById('sidebar-user-initial').innerText = dadosPerfil.nome.charAt(0).toUpperCase();
    }
    
    // Marcar link ativo (opcional)
    const currentPage = window.location.pathname.split("/").pop().split(".");
    document.querySelectorAll('.nav-item').forEach(item => {
        if(item.dataset.page === currentPage) {
            item.classList.add('bg-blue-50', 'text-blue-600');
            item.classList.remove('text-gray-500');
        }
    });
});
