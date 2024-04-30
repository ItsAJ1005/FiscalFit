#!/bin/bash

echo "Enter username:"
read username

echo "Enter email:"
read email

echo "Enter password:"
read -s password

echo "Re-Enter password:"
read -s re_password

if [ "$password" != "$re_password" ]; then
    echo "Password didn't match. Please try again."
    exit 1
fi

role="supreme"

echo "Creating superuser with the following details:"
echo "Username: $username"
echo "Email: $email"
echo "Role: $role"

# Sending POST request to signup route
curl -X POST -H "Content-Type: application/json" -d '{
  "username": "'"$username"'",
  "email": "'"$email"'",
  "password": "'"$password"'",
  "role": "'"$role"'"
}' http://localhost:5000/api/auth/signup

echo "Superuser creation request sent successfully."