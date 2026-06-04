import { initModule, createStatusBadge } from "./modules-logic.js";
import adminDataManager from "./data-manager.js";

document.addEventListener("DOMContentLoaded", () => {
  initModule({
    storageKey: "ORGANIZATIONS",
    tableId: "orgs-table",
    renderRow: (org) => `
            <tr>
                <td>
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <img src="https://ui-avatars.com/api/?name=${encodeURIComponent(org.name)}&background=random" style="width: 35px; height: 35px; border-radius: 8px;">
                        <div>
                            <div style="font-weight: 600;">${org.name}</div>
                            <div style="font-size: 0.75rem; color: var(--text-secondary);">${org.email}</div>
                        </div>
                    </div>
                </td>
                <td>${org.type}</td>
                <td>${org.sport}</td>
                <td>${org.admin}</td>
                <td>${createStatusBadge(org.status)}</td>
                <td>
                    <div style="display: flex; gap: 8px;">
                        <button class="icon-btn" title="View Profile" onclick="handleAction('view', '${org.id}')"><i class="bi bi-eye"></i></button>
                        <button class="icon-btn" title="Edit" onclick="handleAction('edit', '${org.id}')"><i class="bi bi-pencil-square"></i></button>
                        <button class="icon-btn" title="Delete" onclick="handleAction('delete', '${org.id}')" style="color: var(--danger);"><i class="bi bi-trash"></i></button>
                    </div>
                </td>
            </tr>
        `,
  });


  document.getElementById("add-org-btn")?.addEventListener("click", () => {
    UI.showModal({
      title: "Add Organization",
      body: `
                <form id="add-org-form">
                    <div class="form-group"><label>Organization Name</label><input type="text" class="form-control" name="name" placeholder="Organization name"></div>
                    <div class="form-group"><label>Official Email</label><input type="email" class="form-control" name="email" placeholder="org@example.com"></div>
                    <div class="preview-details">
                        <div class="form-group"><label>Type</label><input type="text" class="form-control" name="type" placeholder="e.g. Professional"></div>
                        <div class="form-group"><label>Sport Focus</label><input type="text" class="form-control" name="sport" placeholder="Primary sport"></div>
                    </div>
                </form>
            `,
      footer: [
        { label: "Cancel", className: "icon-btn" },
        {
          label: "Add Org",
          className: "icon-btn",
          style:
            "background: var(--accent-cyan); border: none; color: var(--bg-primary);",
          onClick: (e, overlay) => {
            const data = Object.fromEntries(
              new FormData(overlay.querySelector("#add-org-form")).entries(),
            );
            adminDataManager.addItem("ORGANIZATIONS", data);
            UI.showToast("Organization added!", "success");
            location.reload();
          },
        },
      ],
    });
  });
});
