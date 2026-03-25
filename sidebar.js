// sidebar.js
document.addEventListener("DOMContentLoaded", function() {
    const sidebarHTML = `
    <aside class="w-64 bg-white border-r border-gray-100 flex flex-col fixed h-full z-50">
        <div class="p-6 flex items-center gap-3">
            <div class="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg">
                <i class="fas fa-brain text-xl"></i>
            </div>
            <div>
                <h1 class="font-bold text-gray-800 leading-tight">MedQuest</h1>
                <p class="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">Provas e Questões</p>
            </div>
        </div>
        <nav class="flex-1 px-4 mt-4 space-y-1 overflow-y-auto">
            <p class="text-[10px] font-bold text-gray-400 uppercase tracking-wider px-3 mb-2">Navegação</p>
            <a href="index.html" class="nav-link flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-500 hover:bg-gray-50 rounded-xl transition-all">
                <i class="fas fa-home w-5"></i> Página Inicial
            </a>
            <a href="temas.html" class="nav-link flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-500 hover:bg-gray-50 rounded-xl transition-all">
                <i class="fas fa-layer-group w-5"></i> Temas
            </a>
            <a href="estatisticas.html" class="nav-link flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-500 hover:bg-gray-50 rounded-xl transition-all">
                <i class="fas fa-chart-bar w-5"></i> Estatísticas
            </a>
            </nav>
        <div class="p-4 border-t border-gray-100">
            <div class="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 cursor-pointer">
                <div class="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-xs">V</div>
                <div class="flex-1 min-w-0">
                    <p class="text-xs font-bold text-gray-800 truncate">Dr. Victor</p>
                </div>
            </div>
        </div>
    </aside>`;

    // Insere a sidebar no início do body
    document.body.insertAdjacentHTML('afterbegin', sidebarHTML);

    // Destaca o link ativo baseado na URL atual
    const currentPage = window.location.pathname.split("/").pop();
    document.querySelectorAll(".nav-link").forEach(link => {
        if (link.getAttribute("href") === currentPage) {
            link.classList.add("bg-blue-50", "text-blue-600");
            link.classList.remove("text-gray-500");
        }
    });
});
