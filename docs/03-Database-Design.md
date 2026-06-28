# Database Design

## NTI POS

# 1. Users Collection

## Purpose

The Users collection stores information about every person who is authorized to access the NTI POS system.

Each user is assigned a role that determines the actions they are permitted to perform within the application.

In Version 1, the system supports two roles:

* Admin
* Cashier

Future versions may introduce additional roles such as Manager, Accountant, or Warehouse Staff without requiring significant changes to the database design.

## Fields

| Field     | Data Type     | Required | Unique | Description                             |
| --------- | ------------- | -------- | ------ | --------------------------------------- |
| fullName  | String        | Yes      | No     | Full name of the user                   |
| email     | String        | Yes      | Yes    | User's email address used for login     |
| password  | String        | Yes      | No     | Hashed password                         |
| role      | String (Enum) | Yes      | No     | User role (`admin` or `cashier`)        |
| phone     | String        | No       | No     | Contact number                          |
| isActive  | Boolean       | Yes      | No     | Indicates whether the account is active |
| lastLogin | Date          | No       | No     | Stores the user's last login time       |
| createdAt | Date          | Auto     | No     | Record creation timestamp               |
| updatedAt | Date          | Auto     | No     | Record update timestamp                 |

