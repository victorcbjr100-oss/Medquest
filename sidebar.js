document.addEventListener('DOMContentLoaded', () => {
    // 1. Define a estrutura da Sidebar
    const sidebarHTML = `
    <aside class="w-64 bg-white border-r border-gray-100 flex flex-col fixed h-full z-10 shadow-sm">
        <div class="p-6 flex items-center gap-3">
            <div class="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-100">
                <i class="fas fa-brain text-xl"></i>
            </div>
            <div>
                <h1 class="font-bold text-gray-800 leading-tight">MedQuest</h1>
                <p class="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">Provas e Questões</p>
            </div>
        </div>

        <nav class="flex-1 px-4 space-y-1 mt-4">
            <p class="text-[10px] font-bold text-gray-400 uppercase tracking-wider px-3 mb-2">Navegação</p>
            <a href="index.html" class="nav-link flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-500 hover:bg-gray-50 rounded-xl transition-all" data-page="index">
                <i class="fas fa-home w-5"></i> Página Inicial
            </a>
            <a href="temas.html" class="nav-link flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-500 hover:bg-gray-50 rounded-xl transition-all" data-page="temas">
                <i class="fas fa-layer-group w-5"></i> Temas
            </a>
            <a href="#" class="nav-link flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-500 hover:bg-gray-50 rounded-xl transition-all">
                <i class="fas fa-chart-bar w-5"></i> Estatísticas
            </a>
        </nav>

        <div class="p-4 border-t border-gray-100">
            <a href="perfil.html" class="flex items-center gap-3 px-2 py-2 rounded-xl hover:bg-blue-50 transition-all group border border-transparent hover:border-blue-100">
                <div id="side-user-initial" class="w-9 h-9 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-xs border-2 border-white shadow-sm">
                    V
                </div>
                <div class="overflow-hidden flex-1">
                    <p id="side-user-name" class="text-xs font-bold text-gray-800 truncate">Carregando...</p>
                    <p class="text-[9px] text-blue-500 font-bold uppercase tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity">Ver Perfil</p>
                </div>
                <i class="fas fa-chevron-right text-[10px] text-gray-300 group-hover:text-blue-500 transition-colors"></i>
            </a>
        </div>
    </aside>
    `;

    // 2. Injeta o HTML no início do Body
    document.body.insertAdjacentHTML('afterbegin', sidebarHTML);

    // 3. Carrega os dados do Perfil salvos no navegador
    const dados = JSON.parse(localStorage.getItem('medquest_perfil')) || {
        nome: "Dr. Victor", // Fallback padrão
    };

    const displayNome = document.getElementById('side-user-name');
    const displayInicial = document.getElementById('side-user-initial');

    if (displayNome) displayNome.innerText = dados.nome;
    if (displayInicial) displayInicial.innerText = dados.nome.charAt(0).toUpperCase();

    // 4. Marca o link da página atual como "Ativo" (azul)
    const path = window.location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll('.nav-link').forEach(link => {
        if (link.getAttribute('href') === path) {
            link.classList.add('bg-blue-50', 'text-blue-600');
            link.classList.remove('text-gray-500');
        }
    });
});
