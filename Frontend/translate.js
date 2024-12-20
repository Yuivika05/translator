document.addEventListener('DOMContentLoaded', () => {
  // Form Elements
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');
  const profileForm = document.getElementById('profileForm');
  const navLinks = document.querySelectorAll('.nav a');

  // User State (simulated)
  let currentUser = {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+1234567890',
      avatar: '/api/placeholder/100/100'
  };

  // Utility Functions
  function showToast(message, type = 'success') {
      const toast = document.getElementById('toast');
      toast.textContent = message;
      toast.className = `toast show ${type}`;
      setTimeout(() => toast.className = 'toast', 3000);
  }

  function validateEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
  }

  function validatePassword(password) {
      const hasUpperCase = /[A-Z]/.test(password);
      const hasLowerCase = /[a-z]/.test(password);
      const hasNumbers = /\d/.test(password);
      const hasSpecialChar = /[!@#$%^&*]/.test(password);
      const isLongEnough = password.length >= 8;

      if (hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar && isLongEnough) {
          return 'strong';
      } else if ((hasUpperCase || hasLowerCase) && hasNumbers && isLongEnough) {
          return 'medium';
      }
      return 'weak';
  }

  function showError(input, message) {
      const errorDiv = input.nextElementSibling;
      input.classList.add('error');
      errorDiv.textContent = message;
  }

  function clearError(input) {
      const errorDiv = input.nextElementSibling;
      input.classList.remove('error');
      errorDiv.textContent = '';
  }

  // Navigation Handler
  navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
          e.preventDefault();
          const pageId = link.getAttribute('href').substring(1);

          // Update active state
          navLinks.forEach(l => l.classList.remove('active'));
          link.classList.add('active');

          // Show selected page
          document.querySelectorAll('.card').forEach(card => {
              card.style.display = 'none';
          });
          document.getElementById(pageId).style.display = 'block';
      });
  });

  // Password Strength Indicator
  const passwordInputs = document.querySelectorAll('input[type="password"]');
  passwordInputs.forEach(input => {
      if (input.id === 'register-password' || input.id === 'new-password' || input.id === 'login-password') {
          input.addEventListener('input', (e) => {
              const strength = validatePassword(e.target.value);
              const strengthIndicator = e.target.nextElementSibling.nextElementSibling;
              strengthIndicator.setAttribute('data-strength', strength);
          });
      }
  });

  // Password Toggle Visibility
  document.querySelectorAll('.password-toggle').forEach(toggle => {
      toggle.addEventListener('click', (e) => {
          const passwordInput = e.target.previousElementSibling.previousElementSibling;
          const type = passwordInput.getAttribute('type');
          passwordInput.setAttribute('type', type === 'password' ? 'text' : 'password');
          e.target.textContent = type === 'password' ? 'Hide Password' : 'Show Password';
      });
  });

  // Login Form Handler
  loginForm?.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('login-email');
      const password = document.getElementById('login-password');
      let isValid = true;

      // Validate email
      if (!validateEmail(email.value)) {
          showError(email, 'Please enter a valid email address');
          isValid = false;
      } else {
          clearError(email);
      }

      // Validate password
      const passwordStrength = validatePassword(password.value);
      if (passwordStrength === 'weak') {
          showError(password, 'Password must contain uppercase, lowercase, numbers, and special characters');
          isValid = false;
      } else {
          clearError(password);
      }

      if (isValid) {
          // Simulate login
          showToast('Login successful!');
          // Here you would typically make an API call to authenticate
      }
  });

  // Register Form Handler
  registerForm?.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('register-name');
      const email = document.getElementById('register-email');
      const password = document.getElementById('register-password');
      const confirmPassword = document.getElementById('register-confirm-password');
      const terms = document.getElementById('terms');
      let isValid = true;

      // Validate name
      if (name.value.length < 2) {
          showError(name, 'Name must be at least 2 characters long');
          isValid = false;
      } else {
          clearError(name);
      }

      // Validate email
      if (!validateEmail(email.value)) {
          showError(email, 'Please enter a valid email address');
          isValid = false;
      } else {
          clearError(email);
      }

      // Validate password
      const passwordStrength = validatePassword(password.value);
      if (passwordStrength === 'weak') {
          showError(password, 'Password must contain uppercase, lowercase, numbers, and special characters');
          isValid = false;
      } else {
          clearError(password);
      }

      // Validate confirm password
      if (password.value !== confirmPassword.value) {
          showError(confirmPassword, 'Passwords do not match');
          isValid = false;
      } else {
          clearError(confirmPassword);
      }

      // Validate terms
      if (!terms.checked) {
          showError(terms, 'You must agree to the Terms and Conditions');
          isValid = false;
      } else {
          clearError(terms);
      }

      if (isValid) {
          // Simulate registration
          showToast('Registration successful!');
          // Here you would typically make an API call to register
      }
  });

  // Profile Form Handler
  profileForm?.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('profile-name');
      const email = document.getElementById('profile-email');
      const phone = document.getElementById('profile-phone');
      const currentPassword = document.getElementById('current-password');
      const newPassword = document.getElementById('new-password');
      const confirmNewPassword = document.getElementById('confirm-new-password');
      let isValid = true;

      // Validate name
      if (name.value.length < 2) {
          showError(name, 'Name must be at least 2 characters long');
          isValid = false;
      } else {
          clearError(name);
      }

      // Validate email
      if (!validateEmail(email.value)) {
          showError(email, 'Please enter a valid email address');
          isValid = false;
      } else {
          clearError(email);
      }

      // Validate phone (optional)
      if (phone.value && !/^\+?\d{10,}$/.test(phone.value)) {
          showError(phone, 'Please enter a valid phone number');
          isValid = false;
      } else {
          clearError(phone);
      }

      // Validate password change if attempted
      if (newPassword.value || currentPassword.value || confirmNewPassword.value) {
          if (!currentPassword.value) {
              showError(currentPassword, 'Please enter your current password');
              isValid = false;
          }

          if (newPassword.value && validatePassword(newPassword.value) === 'weak') {
              showError(newPassword, 'Password must be stronger');
              isValid = false;
          }

          if (newPassword.value !== confirmNewPassword.value) {
              showError(confirmNewPassword, 'Passwords do not match');
              isValid = false;
          }
      }

      if (isValid) {
          // Simulate profile update
          showToast('Profile updated successfully!');
          // Here you would typically make an API call to update profile
      }
  });

  // Avatar Upload Handler
  const avatarUpload = document.getElementById('avatar-upload');
  avatarUpload?.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
          if (file.size > 5000000) { // 5MB limit
              showToast('Image size should be less than 5MB', 'error');
              return;
          }

          const reader = new FileReader();
          reader.onload = (e) => {
              document.getElementById('profile-avatar').src = e.target.result;
              showToast('Profile picture updated!');
          };
          reader.readAsDataURL(file);
      }
  });

  // Social Login Handlers
  window.socialLogin = function(provider) {
      showToast(`Logging in with ${provider}...`);
      // Here you would typically implement OAuth flow
  };

  // Initialize profile data
  function initializeProfile() {
      if (document.getElementById('profile-name')) {
          document.getElementById('profile-name').value = currentUser.name;
          document.getElementById('profile-email').value = currentUser.email;
          document.getElementById('profile-phone').value = currentUser.phone;
          document.getElementById('profile-avatar').src = currentUser.avatar;
      }
  }

  // Initialize the application
  initializeProfile();

  // Show the corresponding section when the hash changes
  window.addEventListener('hashchange', function() {
      const hash = window.location.hash.substring(1);
      if (hash) {
          showSection(hash);
      } else {
          showSection('home');
      }
  });

  // Initial load
  if (window.location.hash) {
      showSection(window.location.hash.substring(1));
  } else {
      showSection('home');
  }

  function showSection(sectionId) {
      document.querySelectorAll('.card').forEach(card => {
          card.classList.remove('visible');
      });
      document.getElementById(sectionId).classList.add('visible');
  }

  function closeSection(sectionId) {
      document.getElementById(sectionId).classList.remove('visible');
      document.getElementById('home').classList.add('visible');
  }
});
