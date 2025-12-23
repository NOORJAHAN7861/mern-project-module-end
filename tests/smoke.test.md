# Smoke tests

1. Register user
   - POST /api/auth/register { "username":"noor", "password":"pass@123", "role":"admin" }

2. Login and capture token
   - POST /api/auth/login { "username":"noor", "password":"pass@123" }

3. Create customer (Bearer token)
   - POST /api/customers { "name":"Acme Corp", "contact_info":{ "email":"info@acme.com" }, "status":"active" }

4. List customers (Bearer token)
   - GET /api/customers

5. Create case (Bearer token)
   - POST /api/cases { "customer_id":"<CUSTOMER_ID>", "assigned_to":"<USER_ID>", "priority":"high", "status":"open", "title":"Support request" }

6. Update case status (Bearer token)
   - PATCH /api/cases/<CASE_ID> { "status":"in_progress" }