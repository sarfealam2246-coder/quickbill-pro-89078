const splashScreen = document.getElementById('splash-screen');
const app = document.getElementById('app');
const profileDrawer = document.getElementById('profile-drawer');
const profileName = document.getElementById('profile-name');
const profileMobile = document.getElementById('profile-mobile');
const shopType = document.getElementById('shop-type');
const totalBills = document.getElementById('total-bills');
const totalSales = document.getElementById('total-sales');
const logoutBtn = document.getElementById('logout-btn');
const liveSales = document.getElementById('live-sales');
const pendingUdhar = document.getElementById('pending-udhar');
const totalBillsDisplay = document.getElementById('total-bills-display');
const menuBtn = document.getElementById('menu-btn');
const bottomNav = document.getElementById('bottom-nav');
const content = document.getElementById('content');

async function init() {
    await new Promise(resolve => setTimeout(resolve, 900));
    splashScreen.style.opacity = 0;
    setTimeout(() => {
        splashScreen.style.display = 'none';
        app.classList.remove('hidden');
        FactoryUI.refreshIcons();
    }, 900);
}

function toggleProfileDrawer() {
    profileDrawer.classList.toggle('hidden');
}

logoutBtn.addEventListener('click', async () => {
    // Implement logout functionality
    // Clear user data and refresh UI
});

async function login() {
    const fullName = document.getElementById('full-name').value;
    const phone = document.getElementById('phone').value;
    const response = await FactoryDB.login(fullName, phone);
    if (response) {
        updateProfileUI(fullName, phone);
    }
}

function updateProfileUI(fullName, phone) {
    profileName.textContent = fullName;
    profileMobile.textContent = phone;
    // Fetch and display shop type, total bills, and total sales
}

async function loadHomeData() {
    const transactions = await FactoryDB.getTransactions();
    // Calculate and display Today's Sales, Pending Udhar, Total Bills
}

async function loadBillingData() {
    // Load billing data and set up event listeners for adding items
}

async function recordTransaction(title, txType, amount, deltaCash, deltaGold, deltaPoints) {
    await FactoryDB.recordTx(title, txType, amount, deltaCash, deltaGold, deltaPoints);
}

async function loadKhataAndNotes() {
    // Load customer list and notes
}

async function loadProfileAndHistory() {
    const transactions = await FactoryDB.getTransactions();
    // Load and display transaction history
}

bottomNav.addEventListener('click', (event) => {
    const targetId = event.target.id;
    if (targetId === 'tab-home') {
        loadHomeData();
    } else if (targetId === 'tab-billing') {
        loadBillingData();
    } else if (targetId === 'tab-khata') {
        loadKhataAndNotes();
    } else if (targetId === 'tab-profile') {
        loadProfileAndHistory();
    }
});

init();