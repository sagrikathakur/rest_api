// AuthLab Client Application Logic

const API_BASE_URL = 'http://localhost:3000/api';
let isMockMode = false;
let mockUsersDatabase = [
  { id: 1, name: "Demo User", email: "demo@example.com", passwordHash: "$2b$10$eWz..." }
];

// DOM ELEMENTS
const serverStatusPill = document.getElementById('serverStatusPill');
const statusDot = document.getElementById('statusDot');
const statusText = document.getElementById('statusText');
const toggleMockBtn = document.getElementById('toggleMockBtn');

const tabBtns = document.querySelectorAll('.tab-btn');
const tabPanels = document.querySelectorAll('.tab-panel');
const dashboardLock = document.getElementById('dashboardLock');

const globalAlert = document.getElementById('globalAlert');
const alertIcon = document.getElementById('alertIcon');
const alertMessage = document.getElementById('alertMessage');

// Signup Elements
const signupForm = document.getElementById('signupForm');
const signupName = document.getElementById('signupName');
const signupEmail = document.getElementById('signupEmail');
const signupPassword = document.getElementById('signupPassword');
const signupConfirmPassword = document.getElementById('signupConfirmPassword');
const signupSubmitBtn = document.getElementById('signupSubmitBtn');
const strengthBar = document.getElementById('strengthBar');
const strengthLabel = document.getElementById('strengthLabel');
const passMatchIndicator = document.getElementById('passMatchIndicator');

// Requirements checklist
const reqLength = document.getElementById('reqLength');
const reqUpper = document.getElementById('reqUpper');
const reqLower = document.getElementById('reqLower');
const reqNumber = document.getElementById('reqNumber');
const reqSpecial = document.getElementById('reqSpecial');

// Login Elements
const loginForm = document.getElementById('loginForm');
const loginEmail = document.getElementById('loginEmail');
const loginPassword = document.getElementById('loginPassword');
const loginSubmitBtn = document.getElementById('loginSubmitBtn');

// Dashboard Elements
const dashAvatar = document.getElementById('dashAvatar');
const dashWelcome = document.getElementById('dashWelcome');
const dashSub = document.getElementById('dashSub');
const profileId = document.getElementById('profileId');
const profileName = document.getElementById('profileName');
const profileEmail = document.getElementById('profileEmail');
const testApiBtn = document.getElementById('testApiBtn');
const corruptTokenBtn = document.getElementById('corruptTokenBtn');
const responseStatus = document.getElementById('responseStatus');
const responseJson = document.getElementById('responseJson');
const logoutBtn = document.getElementById('logoutBtn');

// JWT Inspector Elements
const jwtStatusBadge = document.getElementById('jwtStatusBadge');
const jwtBreakdownArea = document.getElementById('jwtBreakdownArea');
const jwtJsonGrids = document.getElementById('jwtJsonGrids');
const jwtHeaderJson = document.getElementById('jwtHeaderJson');
const jwtPayloadJson = document.getElementById('jwtPayloadJson');

// INITIALIZATION
document.addEventListener('DOMContentLoaded', () => {
  setupTabs();
  setupPasswordToggles();
  setupValidationListeners();
  checkBackendHealth();
  updateAuthUI();

  // Mode button
  toggleMockBtn.addEventListener('click', () => {
    isMockMode = !isMockMode;
    updateServerStatusPill(isMockMode ? 'simulated' : 'checking');
    showAlert(isMockMode ? 'Switched to Simulated Offline Mode' : 'Switched to Auto Backend Mode', 'info');
    if (!isMockMode) checkBackendHealth();
  });

  // Forms
  signupForm.addEventListener('submit', handleSignup);
  loginForm.addEventListener('submit', handleLogin);

  // Dashboard actions
  testApiBtn.addEventListener('click', testProtectedEndpoint);
  corruptTokenBtn.addEventListener('click', simulateCorruptToken);
  logoutBtn.addEventListener('click', handleLogout);
});

// TABS LOGIC
function setupTabs() {
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');

      // Check lock on dashboard
      if (targetTab === 'dashboardTab' && !getToken()) {
        showAlert('Please sign in first to access the Protected Dashboard.', 'error');
        return;
      }

      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanels.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      document.getElementById(targetTab).classList.add('active');
    });
  });
}

function switchTab(tabId) {
  const btn = document.querySelector(`.tab-btn[data-tab="${tabId}"]`);
  if (btn) btn.click();
}

// PASSWORD VISIBILITY TOGGLE
function setupPasswordToggles() {
  document.querySelectorAll('.toggle-password-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      const input = document.getElementById(targetId);
      if (input.type === 'password') {
        input.type = 'text';
        btn.textContent = '🙈';
      } else {
        input.type = 'password';
        btn.textContent = '👁️';
      }
    });
  });
}

// BACKEND HEALTH CHECK
async function checkBackendHealth() {
  if (isMockMode) return;

  updateServerStatusPill('checking');
  try {
    const res = await fetch('http://localhost:3000/', { method: 'GET' });
    if (res.ok) {
      updateServerStatusPill('online');
    } else {
      updateServerStatusPill('offline');
    }
  } catch (err) {
    updateServerStatusPill('offline');
  }
}

function updateServerStatusPill(state) {
  statusDot.className = 'status-dot';
  if (state === 'online') {
    statusDot.classList.add('online');
    statusText.textContent = 'Backend: Online (Port 3000)';
    toggleMockBtn.textContent = 'Mode: Real Server';
  } else if (state === 'simulated') {
    statusDot.classList.add('simulated');
    statusText.textContent = 'Backend: Simulated (Offline)';
    toggleMockBtn.textContent = 'Mode: Simulated';
  } else if (state === 'offline') {
    statusDot.classList.add('offline');
    statusText.textContent = 'Backend: Offline (Click to Simulate)';
    toggleMockBtn.textContent = 'Mode: Offline';
  } else {
    statusDot.classList.add('pulsing');
    statusText.textContent = 'Checking Backend...';
  }
}

// VALIDATION LISTENERS
function setupValidationListeners() {
  signupPassword.addEventListener('input', () => {
    validatePasswordStrength(signupPassword.value);
    validatePasswordMatch();
  });

  signupConfirmPassword.addEventListener('input', validatePasswordMatch);
}

function validatePasswordStrength(pass) {
  const hasLength = pass.length >= 8;
  const hasUpper = /[A-Z]/.test(pass);
  const hasLower = /[a-z]/.test(pass);
  const hasNumber = /\d/.test(pass);
  const hasSpecial = /[@$!%*?&]/.test(pass);

  updateReqItem(reqLength, hasLength);
  updateReqItem(reqUpper, hasUpper);
  updateReqItem(reqLower, hasLower);
  updateReqItem(reqNumber, hasNumber);
  updateReqItem(reqSpecial, hasSpecial);

  const score = [hasLength, hasUpper, hasLower, hasNumber, hasSpecial].filter(Boolean).length;
  let percent = (score / 5) * 100;
  strengthBar.style.width = `${percent}%`;

  if (score <= 2) {
    strengthBar.style.backgroundColor = 'var(--accent-danger)';
    strengthLabel.textContent = 'Weak Password';
    strengthLabel.style.color = 'var(--accent-danger)';
  } else if (score <= 4) {
    strengthBar.style.backgroundColor = 'var(--accent-warning)';
    strengthLabel.textContent = 'Medium Strength';
    strengthLabel.style.color = 'var(--accent-warning)';
  } else {
    strengthBar.style.backgroundColor = 'var(--accent-success)';
    strengthLabel.textContent = 'Strong Password';
    strengthLabel.style.color = 'var(--accent-success)';
  }
}

function updateReqItem(el, isValid) {
  if (isValid) {
    el.className = 'valid';
    el.textContent = el.textContent.replace('❌', '✅');
  } else {
    el.className = '';
    el.textContent = el.textContent.replace('✅', '❌');
  }
}

function validatePasswordMatch() {
  const p1 = signupPassword.value;
  const p2 = signupConfirmPassword.value;

  if (!p2) {
    passMatchIndicator.textContent = '';
    passMatchIndicator.className = 'match-indicator';
    return false;
  }

  if (p1 === p2) {
    passMatchIndicator.textContent = '✅ Passwords match';
    passMatchIndicator.className = 'match-indicator match';
    return true;
  } else {
    passMatchIndicator.textContent = '❌ Passwords do not match';
    passMatchIndicator.className = 'match-indicator mismatch';
    return false;
  }
}

// ALERT HELPER
function showAlert(msg, type = 'info') {
  globalAlert.className = `alert alert-${type}`;
  alertMessage.textContent = msg;

  if (type === 'success') alertIcon.textContent = '✅';
  else if (type === 'error') alertIcon.textContent = '⚠️';
  else alertIcon.textContent = 'ℹ️';

  globalAlert.classList.remove('hidden');
  setTimeout(() => {
    globalAlert.classList.add('hidden');
  }, 5000);
}

// SIGNUP HANDLER
async function handleSignup(e) {
  e.preventDefault();
  const name = signupName.value.trim();
  const email = signupEmail.value.trim();
  const password = signupPassword.value;
  const confirmPassword = signupConfirmPassword.value;

  if (name.length < 3) {
    showAlert('Name must be at least 3 characters.', 'error');
    return;
  }
  if (!email || !email.includes('@')) {
    showAlert('Please enter a valid email address.', 'error');
    return;
  }
  if (password !== confirmPassword) {
    showAlert('Passwords do not match.', 'error');
    return;
  }

  setBtnLoading(signupSubmitBtn, true);

  if (isMockMode) {
    setTimeout(() => {
      setBtnLoading(signupSubmitBtn, false);
      const exists = mockUsersDatabase.find(u => u.email === email);
      if (exists) {
        showAlert('[Simulated] Email already exists!', 'error');
      } else {
        mockUsersDatabase.push({ id: mockUsersDatabase.length + 1, name, email, password });
        showAlert('[Simulated] Account registered successfully! Please sign in.', 'success');
        loginEmail.value = email;
        switchTab('loginTab');
      }
    }, 600);
    return;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, confirmPassword })
    });

    const data = await response.json();
    setBtnLoading(signupSubmitBtn, false);

    if (response.ok && data.success) {
      showAlert('Account registered successfully! Now sign in with your credentials.', 'success');
      loginEmail.value = email;
      switchTab('loginTab');
    } else {
      showAlert(data.message || 'Registration failed.', 'error');
    }
  } catch (err) {
    setBtnLoading(signupSubmitBtn, false);
    console.warn('Real server connection failed, offering simulated mode option:', err);
    showAlert('Could not connect to Express server at port 3000. Switch to Simulated mode at top right to test offline.', 'error');
  }
}

// LOGIN HANDLER
async function handleLogin(e) {
  e.preventDefault();
  const email = loginEmail.value.trim();
  const password = loginPassword.value;

  if (!email || !password) {
    showAlert('Please enter both email and password.', 'error');
    return;
  }

  setBtnLoading(loginSubmitBtn, true);

  if (isMockMode) {
    setTimeout(() => {
      setBtnLoading(loginSubmitBtn, false);
      const user = mockUsersDatabase.find(u => u.email === email);
      if (!user) {
        showAlert('[Simulated] Invalid email or password.', 'error');
      } else {
        const fakeToken = generateFakeJWT({ id: user.id, name: user.name, email: user.email });
        saveToken(fakeToken);
        updateAuthUI();
        showAlert('[Simulated] Logged in successfully! Token stored in localStorage.', 'success');
        switchTab('dashboardTab');
      }
    }, 600);
    return;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();
    setBtnLoading(loginSubmitBtn, false);

    if (response.ok && data.success && data.token) {
      saveToken(data.token);
      updateAuthUI();
      showAlert('Signed in successfully! Your JWT Token is active.', 'success');
      switchTab('dashboardTab');
    } else {
      showAlert(data.message || 'Invalid credentials.', 'error');
    }
  } catch (err) {
    setBtnLoading(loginSubmitBtn, false);
    showAlert('Could not connect to Express server at port 3000. Click "Mode" at top right to enable Simulated Mode.', 'error');
  }
}

// TEST PROTECTED ENDPOINT (/api/me)
async function testProtectedEndpoint() {
  const token = getToken();
  if (!token) {
    showAlert('No token found. Please log in.', 'error');
    return;
  }

  responseStatus.className = 'status-badge hidden';
  responseJson.textContent = 'Sending request to server...';

  if (isMockMode) {
    setTimeout(() => {
      const decoded = parseJwt(token);
      if (decoded && !token.includes('corrupted')) {
        responseStatus.textContent = '200 OK';
        responseStatus.className = 'status-badge';
        responseJson.textContent = JSON.stringify({
          success: true,
          message: "[Simulated] Verified Bearer JWT token on server.",
          user: decoded
        }, null, 2);
      } else {
        responseStatus.textContent = '401 Unauthorized';
        responseStatus.className = 'status-badge';
        responseStatus.style.background = 'var(--accent-danger)';
        responseStatus.style.color = '#fff';
        responseJson.textContent = JSON.stringify({
          success: false,
          message: "[Simulated] Invalid or corrupted token signature. Authentication failed."
        }, null, 2);
      }
    }, 400);
    return;
  }

  try {
    const res = await fetch(`${API_BASE_URL}/me`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    const data = await res.json();
    responseStatus.textContent = `${res.status} ${res.statusText}`;
    responseStatus.className = 'status-badge';

    if (res.ok) {
      responseStatus.style.background = 'var(--accent-success)';
      responseStatus.style.color = '#000';
    } else {
      responseStatus.style.background = 'var(--accent-danger)';
      responseStatus.style.color = '#fff';
    }

    responseJson.textContent = JSON.stringify(data, null, 2);
  } catch (err) {
    responseStatus.textContent = 'ERR_CONNECTION_FAILED';
    responseStatus.className = 'status-badge';
    responseJson.textContent = 'Error connecting to server.';
  }
}

function simulateCorruptToken() {
  const currentToken = getToken();
  if (!currentToken) return;
  const corrupted = currentToken.slice(0, -6) + "XXXXXX_corrupted";
  saveToken(corrupted);
  updateAuthUI();
  showAlert('Token corrupted! Try clicking "Fetch /api/me" to see how the server rejects invalid tokens.', 'error');
}

function handleLogout() {
  removeToken();
  updateAuthUI();
  showAlert('Logged out. Token cleared from localStorage.', 'info');
  switchTab('loginTab');
}

// STORAGE & AUTH UI STATE
function saveToken(token) {
  localStorage.setItem('auth_token', token);
}

function getToken() {
  return localStorage.getItem('auth_token');
}

function removeToken() {
  localStorage.removeItem('auth_token');
}

function updateAuthUI() {
  const token = getToken();

  if (token) {
    dashboardLock.style.display = 'none';
    jwtStatusBadge.textContent = 'Active JWT Token Stored';
    jwtStatusBadge.style.background = 'rgba(16, 185, 129, 0.2)';
    jwtStatusBadge.style.color = '#6ee7b7';

    renderJwtInspector(token);

    const payload = parseJwt(token);
    if (payload) {
      dashWelcome.textContent = `Welcome back, ${payload.name || 'User'}!`;
      profileId.textContent = payload.id || '1';
      profileName.textContent = payload.name || 'Demo User';
      profileEmail.textContent = payload.email || 'demo@example.com';
    }
  } else {
    dashboardLock.style.display = 'inline-block';
    jwtStatusBadge.textContent = 'No Token Stored';
    jwtStatusBadge.style.background = 'rgba(255, 255, 255, 0.08)';
    jwtStatusBadge.style.color = 'var(--text-muted)';

    jwtBreakdownArea.innerHTML = '<p class="jwt-placeholder-msg">Log in to view real-time JWT structure (Header, Payload, Signature).</p>';
    jwtJsonGrids.classList.add('hidden');

    profileId.textContent = '-';
    profileName.textContent = '-';
    profileEmail.textContent = '-';
  }
}

// JWT PARSER & VISUALIZER
function parseJwt(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
}

function renderJwtInspector(token) {
  const parts = token.split('.');
  if (parts.length !== 3) {
    jwtBreakdownArea.innerHTML = `<span style="color: var(--accent-danger);">${token} (Invalid JWT format)</span>`;
    jwtJsonGrids.classList.add('hidden');
    return;
  }

  const [headerB64, payloadB64, signatureB64] = parts;

  jwtBreakdownArea.innerHTML = `
    <span class="jwt-part-header">${headerB64}</span><span class="jwt-dot">.</span><span class="jwt-part-payload">${payloadB64}</span><span class="jwt-dot">.</span><span class="jwt-part-signature">${signatureB64}</span>
  `;

  try {
    const headerObj = JSON.parse(atob(headerB64.replace(/-/g, '+').replace(/_/g, '/')));
    const payloadObj = parseJwt(token);

    jwtHeaderJson.textContent = JSON.stringify(headerObj, null, 2);
    jwtPayloadJson.textContent = JSON.stringify(payloadObj, null, 2);
    jwtJsonGrids.classList.remove('hidden');
  } catch (err) {
    jwtJsonGrids.classList.add('hidden');
  }
}

// SIMULATED JWT GENERATOR FOR OFFLINE MOCK MODE
function generateFakeJWT(user) {
  const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + 3600;
  const payload = btoa(JSON.stringify({ id: user.id, email: user.email, name: user.name, iat, exp }));
  const signature = "SimulatedSignature_d9a8f7e6c5b4a321";
  return `${header}.${payload}.${signature}`;
}

function setBtnLoading(btn, isLoading) {
  const text = btn.querySelector('.btn-text');
  const spinner = btn.querySelector('.btn-spinner');
  if (isLoading) {
    text.style.opacity = '0.5';
    spinner.classList.remove('hidden');
    btn.disabled = true;
  } else {
    text.style.opacity = '1';
    spinner.classList.add('hidden');
    btn.disabled = false;
  }
}
