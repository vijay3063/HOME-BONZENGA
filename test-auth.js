// Simple test script to verify authentication endpoints
const testAuth = async () => {
  const baseUrl = 'http://localhost:3001/api';
  
  console.log('Testing authentication endpoints...\n');
  
  // Test 1: Register a new user
  console.log('1. Testing user registration...');
  try {
    const registerResponse = await fetch(`${baseUrl}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'test@example.com',
        password: 'Test123!',
        firstName: 'Test',
        lastName: 'User',
        role: 'CUSTOMER'
      })
    });
    
    const registerData = await registerResponse.json();
    console.log('Register Status:', registerResponse.status);
    console.log('Register Response:', registerData);
    
    if (registerResponse.ok) {
      console.log('✅ Registration successful\n');
      
      // Test 2: Login with the registered user
      console.log('2. Testing user login...');
      const loginResponse = await fetch(`${baseUrl}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'test@example.com',
          password: 'Test123!'
        })
      });
      
      const loginData = await loginResponse.json();
      console.log('Login Status:', loginResponse.status);
      console.log('Login Response:', loginData);
      
      if (loginResponse.ok) {
        console.log('✅ Login successful\n');
        
        // Test 3: Test /me endpoint
        console.log('3. Testing /me endpoint...');
        const meResponse = await fetch(`${baseUrl}/auth/me`, {
          headers: {
            'Authorization': `Bearer ${loginData.accessToken}`
          }
        });
        
        const meData = await meResponse.json();
        console.log('Me Status:', meResponse.status);
        console.log('Me Response:', meData);
        
        if (meResponse.ok) {
          console.log('✅ /me endpoint successful\n');
        } else {
          console.log('❌ /me endpoint failed\n');
        }
      } else {
        console.log('❌ Login failed\n');
      }
    } else {
      console.log('❌ Registration failed\n');
    }
  } catch (error) {
    console.error('❌ Test failed with error:', error.message);
  }
  
  // Test 4: Test admin login
  console.log('4. Testing admin login...');
  try {
    const adminResponse = await fetch(`${baseUrl}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'admin@homebonzenga.com',
        password: 'Admin@123'
      })
    });
    
    const adminData = await adminResponse.json();
    console.log('Admin Login Status:', adminResponse.status);
    console.log('Admin Login Response:', adminData);
    
    if (adminResponse.ok) {
      console.log('✅ Admin login successful\n');
    } else {
      console.log('❌ Admin login failed\n');
    }
  } catch (error) {
    console.error('❌ Admin test failed with error:', error.message);
  }
  
  console.log('Authentication tests completed!');
};

// Run the test
testAuth();
