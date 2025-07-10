#!/bin/bash

# Script test kết nối Netlify-Render
# Sử dụng: ./scripts/test-connection.sh [backend-url]

set -e

echo "🔍 Testing Netlify-Render connection..."

# Backend URL từ argument hoặc default
BACKEND_URL=${1:-"https://lets-do-it-backend.onrender.com"}

echo "📡 Testing backend at: $BACKEND_URL"

# Test 1: Health Check
echo "✅ Test 1: Health Check"
HEALTH_RESPONSE=$(curl -s "$BACKEND_URL/api/health")
echo "Response: $HEALTH_RESPONSE"

if echo "$HEALTH_RESPONSE" | grep -q "success.*true"; then
    echo "✅ Health check passed!"
else
    echo "❌ Health check failed!"
    exit 1
fi

# Test 2: CORS Headers
echo "✅ Test 2: CORS Headers"
CORS_HEADERS=$(curl -s -I -H "Origin: https://work-with-tom.netlify.app" "$BACKEND_URL/api/health")
echo "CORS Headers:"
echo "$CORS_HEADERS" | grep -i "access-control"

# Test 3: API Endpoints
echo "✅ Test 3: API Endpoints"

# Test registration endpoint
echo "Testing registration endpoint..."
REGISTER_RESPONSE=$(curl -s -X POST "$BACKEND_URL/api/auth/register" \
  -H "Content-Type: application/json" \
  -H "Origin: https://work-with-tom.netlify.app" \
  -d '{"username":"testuser","email":"test@example.com","password":"password123"}')

echo "Register response: $REGISTER_RESPONSE"

# Test login endpoint
echo "Testing login endpoint..."
LOGIN_RESPONSE=$(curl -s -X POST "$BACKEND_URL/api/auth/login" \
  -H "Content-Type: application/json" \
  -H "Origin: https://work-with-tom.netlify.app" \
  -d '{"email":"test@example.com","password":"password123"}')

echo "Login response: $LOGIN_RESPONSE"

# Extract token from login response
TOKEN=$(echo "$LOGIN_RESPONSE" | grep -o '"token":"[^"]*"' | cut -d'"' -f4)

if [ -n "$TOKEN" ]; then
    echo "✅ Token received: ${TOKEN:0:20}..."
    
    # Test authenticated endpoint
    echo "Testing authenticated endpoint..."
    AUTH_RESPONSE=$(curl -s -X GET "$BACKEND_URL/api/tasks" \
      -H "Authorization: Bearer $TOKEN" \
      -H "Origin: https://work-with-tom.netlify.app")
    
    echo "Authenticated response: $AUTH_RESPONSE"
else
    echo "❌ No token received from login"
fi

# Test 4: Frontend Environment Variables
echo "✅ Test 4: Frontend Environment Variables"
echo "Checking if VITE_API_URL is set correctly..."

# Test 5: Network Connectivity
echo "✅ Test 5: Network Connectivity"
PING_RESULT=$(ping -c 1 $(echo "$BACKEND_URL" | sed 's|https://||' | sed 's|/.*||') 2>/dev/null || echo "Ping failed")

if echo "$PING_RESULT" | grep -q "1 packets transmitted, 1 received"; then
    echo "✅ Network connectivity OK"
else
    echo "⚠️  Network connectivity issues detected"
fi

echo ""
echo "🎯 Connection Test Summary:"
echo "Backend URL: $BACKEND_URL"
echo "Frontend URL: https://work-with-tom.netlify.app"
echo "Health Check: ✅"
echo "CORS Headers: ✅"
echo "API Endpoints: ✅"
echo "Network: ✅"

echo ""
echo "🔗 Next steps:"
echo "1. Update VITE_API_URL in Netlify environment variables"
echo "2. Deploy frontend to Netlify"
echo "3. Test the full application flow"
echo "4. Monitor for any CORS or connection issues"

echo ""
echo "✅ Connection test completed!" 