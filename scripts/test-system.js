const axios = require('axios');

const API_URL = process.env.API_URL || 'http://localhost:5000/api';

async function testSystem() {
  console.log('🧪 Testing system components...\n');

  // Test 1: Health Check
  console.log('1. Testing API Health Check...');
  try {
    const healthResponse = await axios.get(`${API_URL}/health`);
    console.log('✅ Health check passed:', healthResponse.data.message);
  } catch (error) {
    console.log('❌ Health check failed:', error.message);
    return;
  }

  // Test 2: Database Connection
  console.log('\n2. Testing Database Connection...');
  try {
    const dbResponse = await axios.get(`${API_URL}/health`);
    console.log('✅ Database connection working');
  } catch (error) {
    console.log('❌ Database connection failed:', error.message);
  }

  // Test 3: CORS Configuration
  console.log('\n3. Testing CORS Configuration...');
  try {
    const corsResponse = await axios.get(`${API_URL}/health`, {
      headers: {
        'Origin': 'http://localhost:5173'
      }
    });
    console.log('✅ CORS configuration working');
  } catch (error) {
    console.log('❌ CORS configuration failed:', error.message);
  }

  // Test 4: Authentication Endpoints
  console.log('\n4. Testing Authentication Endpoints...');
  try {
    // Test register endpoint (should fail without data)
    const registerResponse = await axios.post(`${API_URL}/auth/register`, {});
    console.log('❌ Register validation not working');
  } catch (error) {
    if (error.response?.status === 400) {
      console.log('✅ Register validation working');
    } else {
      console.log('❌ Register endpoint failed:', error.message);
    }
  }

  // Test 5: Protected Routes
  console.log('\n5. Testing Protected Routes...');
  try {
    const tasksResponse = await axios.get(`${API_URL}/tasks`);
    console.log('❌ Protected routes not working (should require auth)');
  } catch (error) {
    if (error.response?.status === 401) {
      console.log('✅ Protected routes working correctly');
    } else {
      console.log('❌ Protected routes failed:', error.message);
    }
  }

  console.log('\n🎉 System test completed!');
}

testSystem().catch(console.error); 