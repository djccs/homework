
Exercise: 

We have just finished developing a Service that acts as a Single Sign On for the ecosystem implementing the OpenID Connect standard. It will enable users to do: 

● Login in all the different products using the same credentials 

● Create an account if it does not exist 

● Get identity tokens (id_token) that other products within the ecosystem can use to validate the user has been authenticated. 


The public endpoints that need to be tested are: 

● GET /authorize 

● POST /token 

● POST /logout 

The private endpoints that need to be tested are: 

● POST /login 

● POST /signup 

● POST /password/reset 

What we ask you to solve: 
1. Define test cases that are critical for this product. Keep in mind the OIDC standard. 
2. Research to find the best tool to automate testing for this Product 
3. Write 1 automated test using the tool you picked


Solution: 

Note: No testing endpoints were provided so as solution I'm implementing a working  example with a testing app that has authoriation based on OAuth 2.0
http://coop.apps.symfonycasts.com/api


Asume all test cases have assertions for Response Codes, Response Message and Response Body according to api documentation. Also there is a test for schema validation.

1. Test Cases: 

PRIVATE:
● POST /login 
- Verify user can login with valid credentials
- Verify user cannot login with invalid credetials
- Verifies redirect
- Verify token session timeout 
- Verify error code and message for invalid login


● POST /signup:
- Verify user is created wth valid values
- Verify new user can login
- Verified user is not created if already exists
- Verify endpoint returns error if there is a  missing mandatory field.
- Verify response message for each missing mandatory field
- Verify user is not created with invalid data


● POST /password/reset 
- Verify Forgot Password flow
- Verify user can login after password change
- Verify user cannot login wth old password




PUBLIC:
● GET /authorize 
- Verifies authorized user
- Verifies unauthorized users
- Verifies logged in user cannot access resources out of the scope (premissions to resources or other apps)


● POST /token 

● POST /logout 


2. Research best tool to automate this product:
In order to determine the best tool to approach test automation for the product we should study the product wich I have no visibility.
If the scope is limited to API only I would choose to use Postman to create test and Newman as test runner. 
If the scome is broad and includes web I would include Cypress as e2e test framework asumnint that limitations does not aply to this product. 
If mobile , apium

3. Included test cases using cypress in integration/auth/forteAuthTest.js

in order to run test locally: 

- install node: 
$ npm install node
- install dependencies: 
$ yarn
- open cypress UI: 
$ yarn cypress open


Postman Collection link:

https://go.postman.co/workspace/TestAuth~1e3ad00d-58c1-4f93-ad3e-9d1dc3daeb8d/collection/10306762-2971d1eb-83d1-4686-b839-aa952f628365

