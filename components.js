// Sarfealam Enterprise Universal UI Components (components.js)
(function() {
  let toastTimer = null;

  function ensureToastEl() {
    let el = document.getElementById("sf-toast");
    if (!el) {
      el = document.createElement("div");
      el.id = "sf-toast";
      el.style.cssText = "position:fixed;top:14px;left:50%;transform:translateX(-50%) translateY(-80px);z-index:99999;background:#0f172a;color:#f8fafc;border:1.5px solid #38bdf8;padding:10px 18px;border-radius:12px;font-size:13px;font-weight:700;box-shadow:0 8px 24px rgba(0,0,0,0.45);transition:transform 0.25s ease;max-width:90%;text-align:center;";
      document.body.appendChild(el);
    }
    return el;
  }

  // Android Hardware Back Button support for Modals & Drawers
  window.addEventListener("popstate", function() {
    const modal = document.getElementById("app-modal");
    if (modal && modal.classList.contains("open")) {
      modal.classList.remove("open");
      return;
    }
    const drawer = document.getElementById("profile-drawer");
    const backdrop = document.getElementById("drawer-backdrop");
    if (drawer && drawer.classList.contains("open")) {
      drawer.classList.remove("open");
      if (backdrop) backdrop.classList.remove("open");
    }
  });

  window.FactoryUI = {
    vibrate: function(ms) {
      try {
        if (navigator.vibrate) navigator.vibrate(ms || 18);
      } catch (e) {}
    },
    safeNum: function(val, fallback) {
      const n = Number(val);
      return Number.isFinite(n) ? n : (fallback || 0);
    },
    formatINR: function(val) {
      const n = window.FactoryUI.safeNum(val, 0);
      return "Rs. " + n.toLocaleString("en-IN");
    },
    toast: function(msg, type) {
      window.FactoryUI.vibrate(15);
      const el = ensureToastEl();
      el.textContent = msg || "Done";
      el.style.borderColor = type === "error" ? "#ef4444" : (type === "warn" ? "#f59e0b" : "#10b981");
      el.style.transform = "translateX(-50%) translateY(0)";
      clearTimeout(toastTimer);
      toastTimer = setTimeout(function() {
        el.style.transform = "translateX(-50%) translateY(-80px)";
      }, 2600);
    },
    modal: function(title, bodyHtml) {
      window.FactoryUI.vibrate(12);
      let modal = document.getElementById("app-modal");
      if (!modal) {
        modal = document.createElement("div");
        modal.id = "app-modal";
        document.body.appendChild(modal);
      }
      modal.innerHTML = '<div class="modal-card">' +
        '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">' +
        '<h3 style="margin:0;font-size:17px;color:#f8fafc;">' + (title || "Details") + '</h3>' +
        '<button type="button" onclick="FactoryUI.closeModal()" style="min-height:32px;padding:4px 10px;background:#334155 !important;border-radius:8px;font-size:13px;">X</button>' +
        '</div>' +
        '<div style="font-size:14px;color:#cbd5e1;line-height:1.5;">' + (bodyHtml || "") + '</div>' +
        '</div>';
      modal.classList.add("open");
      try { window.history.pushState({ sfModal: true }, ""); } catch (e) {}
    },
    closeModal: function() {
      const modal = document.getElementById("app-modal");
      if (modal) modal.classList.remove("open");
    },
    receipt: function(title, rows) {
      let listHtml = '<div style="background:#0f172a;border:1px solid #1e293b;border-radius:12px;padding:12px;margin:10px 0;">';
      (rows || []).forEach(function(r) {
        listHtml += '<div style="display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid #1e293b;">' +
          '<span style="color:#94a3b8;">' + r[0] + '</span>' +
          '<strong style="color:#f8fafc;">' + r[1] + '</strong></div>';
      });
      listHtml += '</div><button type="button" onclick="FactoryUI.closeModal()" style="width:100%;margin-top:8px;background:#10b981 !important;">Done</button>';
      window.FactoryUI.modal("Confirmed: " + (title || "Success"), listHtml);
    },
    refreshIcons: function() {
      try { if (window.lucide && window.lucide.createIcons) window.lucide.createIcons(); } catch (e) {}
    }
  };
})();
