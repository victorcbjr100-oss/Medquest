// sidebar.js
function inicializarSidebar() {
    // Evita duplicados
    if (document.querySelector('aside')) return;

    const sidebarHTML = `
    <aside id="sidebar-medquest" style="width: 256px; background-color: white; border-right: 1px solid #f3f4f6; display: flex; flex-direction: column; position: fixed; h-full; height: 100vh; z-index: 9999; left: 0; top: 0; font-family: sans-serif;">
        <div style="padding: 24px; display: flex; align-items: center; gap: 12px;">
            <div style="width: 40px; height: 40px; background-color: #2563eb; border-radius: 12px; display: flex; align-items: center; justify-content: center; color: white; box-shadow: 0 10px 15px -3px rgba(37, 99, 235, 0.4);">
                <i class="fas fa-brain" style="font-size: 20px;"></i>
            </div>
            <div>
                <h1 style="font-weight: bold; color: #1f2937; margin: 0; font-size: 18px; line-height: 1;">MedQuest</h1>
                <p style="font-size: 10px; color: #9ca3af; font-weight: bold; text-transform: uppercase; margin: 0; letter-spacing: 0.1em;">Provas e Questões</p>
            </div>
        </div>

        <nav style="flex: 1; padding: 0 16px; margin-top: 16px; overflow-y: auto;">
            <p style="font-size: 10px; font-weight: bold; color: #d1d5db; text-transform: uppercase; letter-spacing: 0.1em; padding: 0 12px; margin-bottom: 8px;">Navegação</p>
            
            <a href="index.html" class="nav-item" style="display: flex; align-items: center; gap: 12px; padding: 10px 12px; font-size: 14px; font-weight: 600; color: #6b7280; text-decoration: none; border-radius: 12px; transition: 0.2s;">
                <i class="fas fa-home" style="width: 20px;"></i> Página Inicial
            </a>
            <a href="temas.html" class="nav-item" style="display: flex; align-items: center; gap: 12px; padding: 10px 12px; font-size: 14px; font-weight: 600; color: #6b7280; text-decoration: none; border-radius: 12px; transition: 0.2s;">
                <i class="fas fa-layer-group" style="width: 20px;"></i> Temas
            </a>
            <a href="caderno.html" class="nav-item" style="display: flex; align-items: center; gap: 12px; padding: 10px 12px; font-size: 14px; font-weight: 600; color: #6b7280; text-decoration: none; border-radius: 12px; transition: 0.2s;">
                <i class="fas fa-book-medical" style="width: 20px;"></i> Meu Caderno
            </a>

            <div style="padding-top: 24px;">
                <p style="font-size: 10px; font-weight: bold; color: #d1d5db; text-transform: uppercase; letter-spacing: 0.1em; padding: 0 12px; margin-bottom: 8px;">Admin</p>
                <a href="gerenciar-questoes.html" class="nav-item" style="display: flex; align-items: center; gap: 12px; padding: 10px 12px; font-size: 14px; font-weight: 600; color: #6b7280; text-decoration: none; border-radius: 12px; transition: 0.2s;">
                    <i class="fas fa-tasks" style="width: 20px;"></i> Questões
                </a>
            </div>
        </nav>

        <div style="padding: 16px; border-top: 1px solid #f9fafb;">
            <a href="./perfil.html" id="link-perfil" style="display: flex; align-items: center; gap: 12px; padding: 12px; border-radius: 16px; background-color: #f8fafc; border: 1px solid #f1f5f9; text-decoration: none; transition: 0.2s;">
                <div id="sidebar-avatar" style="width: 40px; height: 40px; background-color: #2563eb; color: white; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-weight: bold; overflow: hidden; flex-shrink: 0;">
                    V
                </div>
                <div style="flex: 1; min-width: 0;">
                    <p id="sidebar-user-name" style="font-size: 13px; font-weight: 900; color: #1f2937; margin: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">Dr. Victor</p>
                    <p id="sidebar-user-tag" style="font-size: 10px; color: #3b82f6; font-weight: 900; text-transform: uppercase; margin: 0;">Plano Premium</p>
                </div>
                <i class="fas fa-chevron-right" style="color: #d1d5db; font-size: 10px;"></i>
            </a>
        </div>
    </aside>`;

    document.body.insertAdjacentHTML('afterbegin', sidebarHTML);

    // Carregar dados salvos
    const dados = JSON.parse(localStorage.getItem('medquest_perfil')) || {};
    if (dados.nome) document.getElementById('sidebar-user-name').innerText = dados.nome;
    if (dados.categoria) document.getElementById('sidebar-user-tag').innerText = dados.categoria;
    if (dados.foto) {
        document.getElementById('sidebar-avatar').innerHTML = `<img src="${dados.foto}" style="width:100%; height:100%; object-fit:cover;">`;
    }
}

// Garante que a função rode mesmo se o script carregar tarde
if (document.readyState === 'complete') {
    inicializarSidebar();
} else {
    window.addEventListener('load', inicializarSidebar);
}
