# Software Requirements Specification (SRS)

## NTI POS

### Web-Based Point of Sale (POS) System

**Document Version:** 1.0
**Project Version:** 1.0
**Project Type:** Web-Based Retail Management System
**Architecture:** MVC (Model–View–Controller)
**Technology Stack:** MongoDB, Express.js, React.js (Vite), Node.js
**Prepared By:** Muhammad Rayyan
**Status:** Draft

---

# Revision History

| Version | Date      | Description          | Author          |
| ------- | --------- | -------------------- | --------------- |
| 1.0     | June 2026 | Initial SRS Document | Muhammad Rayyan |

---

# Table of Contents

1. Introduction
2. Overall Description
3. System Overview
4. Product Perspective
5. User Classes and Characteristics
6. Operating Environment
7. Design and Implementation Constraints
8. Assumptions and Dependencies

---

# 1. Introduction

## 1.1 Purpose

This Software Requirements Specification (SRS) defines the functional and non-functional requirements for **NTI POS**, a web-based Point of Sale (POS) system developed using the MERN stack.

The primary objective of NTI POS is to digitalize and simplify the daily operations of a general retail store by providing an efficient platform for managing products, inventory, suppliers, customers, purchases, sales, and business reports.

This document serves as the primary reference for the analysis, design, development, testing, deployment, and future maintenance of the application. It establishes a shared understanding of the project's objectives, scope, features, and constraints among all stakeholders.

---

## 1.2 Scope

NTI POS is designed for small and medium-sized retail businesses that require a centralized system for managing their daily operations.

Version 1 of the application includes the following major modules:

* Authentication
* Dashboard
* Product Management
* Category Management
* Brand Management
* Supplier Management
* Customer Management
* Purchase Management
* Sales Management
* Inventory Management
* Reporting

The system supports barcode-based product identification, manual product search, low-stock monitoring, and role-based access control.

The first release is intended for a single retail store while maintaining an architecture that supports future expansion.

---

## 1.3 Objectives

The primary objectives of NTI POS are:

* Automate retail business operations.
* Reduce manual record keeping.
* Improve inventory accuracy.
* Speed up billing and sales transactions.
* Minimize human error.
* Generate business reports for decision-making.
* Provide secure authentication and authorization.
* Build a scalable foundation for future enhancements.

---

## 1.4 Intended Audience

This document is intended for:

* Project Developer
* Internship Supervisor
* Future Developers
* Software Testers
* Store Owner
* System Administrator

---

## 1.5 Definitions, Acronyms and Abbreviations

| Term     | Description                                                       |
| -------- | ----------------------------------------------------------------- |
| POS      | Point of Sale                                                     |
| MVC      | Model–View–Controller                                             |
| MERN     | MongoDB, Express.js, React.js and Node.js                         |
| REST API | Representational State Transfer Application Programming Interface |
| JWT      | JSON Web Token                                                    |
| CRUD     | Create, Read, Update and Delete                                   |
| SKU      | Stock Keeping Unit                                                |
| UI       | User Interface                                                    |
| UX       | User Experience                                                   |

---

# 2. Overall Description

## 2.1 Product Overview

NTI POS is a web-based retail management application developed to replace manual store operations with a centralized digital system.

The application enables authorized users to manage products, inventory, customers, suppliers, purchases, and sales while providing real-time business insights through dashboards and reports.

The backend follows the MVC architectural pattern to improve maintainability, scalability, and separation of concerns.

---

## 2.2 Product Goals

The goals of NTI POS are to:

* Simplify retail business management.
* Improve operational efficiency.
* Maintain accurate inventory records.
* Reduce processing time during sales.
* Generate reliable reports.
* Improve data security.
* Support future business expansion.

---

## 2.3 Product Features

The application consists of the following major modules:

* Authentication
* Dashboard
* Products
* Categories
* Brands
* Suppliers
* Customers
* Purchases
* Sales
* Inventory
* Reports
* Settings

Each module is designed independently while remaining fully integrated with the rest of the system.

---

# 3. System Overview

NTI POS follows a three-tier architecture consisting of:

## Presentation Layer

Developed using:

* React.js
* Vite
* Tailwind CSS
* JavaScript

Responsibilities include:

* User Interface
* Form Validation
* API Communication
* Responsive Design
* User Experience

---

## Application Layer

Developed using:

* Node.js
* Express.js

Responsibilities include:

* Business Logic
* Authentication
* Authorization
* Request Validation
* REST API Development
* Database Communication

The backend follows the MVC (Model–View–Controller) architecture to ensure modularity and maintainability.

---

## Data Layer

Database:

* MongoDB

Responsibilities include:

* Product Storage
* Sales Records
* Purchase Records
* Customer Data
* Supplier Data
* User Accounts
* Inventory Information

---

# 4. Product Perspective

NTI POS is designed as a modular and scalable application.

Each functional module operates independently while communicating through well-defined REST APIs.

The architecture allows additional modules and features to be incorporated in future versions without requiring major modifications to the existing codebase.

Future versions may include:

* Multi-Branch Support
* Online Payments
* Receipt Printing
* Mobile Application
* AI-Based Sales Analytics
* Customer Loyalty Program
* Cloud Synchronization
* Multi-Warehouse Management
# 5. User Classes and Characteristics

NTI POS supports two primary user roles.

## 5.1 Owner

The Owner is the primary administrator of the system and has unrestricted access to all features.

### Responsibilities

* Manage products
* Manage categories
* Manage brands
* Manage suppliers
* Manage customers
* Record purchases
* Process sales
* View reports
* Monitor inventory
* Manage users
* Configure system settings
* View dashboard analytics

---

## 5.2 Cashier

The Cashier is responsible for day-to-day sales operations.

### Responsibilities

* Login to the system
* Search products
* Scan barcodes
* Process customer sales
* Generate invoices
* View product information

### Restrictions

The cashier shall not be allowed to:

* Manage users
* Access system settings
* Delete business records
* View administrative reports
* Modify application configuration

---

# 6. Operating Environment

NTI POS shall operate in the following environment.

## Client Environment

Supported Browsers

* Google Chrome
* Microsoft Edge
* Mozilla Firefox

Operating Systems

* Windows
* Linux
* macOS

---

## Server Environment

Runtime

* Node.js

Framework

* Express.js

---

## Database Environment

Database Management System

* MongoDB

---

## Development Tools

* Visual Studio Code
* Git
* GitHub
* Postman
* MongoDB Compass

---

# 7. Design and Implementation Constraints

The following constraints apply to Version 1.

* The application shall support one retail branch.
* Cash shall be the only supported payment method.
* Receipt printing shall not be included.
* Product expiry management shall not be included.
* The application requires an internet connection.
* JavaScript shall be used throughout the project.
* React shall be initialized using Vite.
* The backend shall follow the MVC architecture.
* MongoDB shall be used as the primary database.
* Communication between the client and server shall occur through REST APIs.

---

# 8. Assumptions and Dependencies

The following assumptions have been made during project planning.

* Store employees possess basic computer skills.
* Product information entered into the system is accurate.
* Barcode values are available for products that support barcode scanning.
* The application will initially be used within a single retail store.
* Users will access the application using a modern web browser.

---

# 9. Future Scope (Overview)

Although Version 1 focuses on the core requirements of a retail store, the architecture is intentionally designed to support future enhancements.

Potential future features include:

* Multi-branch management
* Online payment integration
* Thermal receipt printing
* Customer loyalty program
* Mobile application
* AI-powered sales forecasting
* AI inventory recommendations
* Multi-language support
* Multi-currency support
* Cloud backup and synchronization
* Advanced analytics dashboard

# 10. Functional Requirements

Functional requirements describe the core features that the system shall provide. Every requirement is assigned a unique identifier for traceability.

---

# 10.1 Authentication Module

### FR-001 — User Login

| Attribute      | Description                                                                       |
| -------------- | --------------------------------------------------------------------------------- |
| Requirement ID | FR-001                                                                            |
| Priority       | High                                                                              |
| Actor          | Owner, Cashier                                                                    |
| Description    | The system shall allow registered users to log in using their email and password. |
| Preconditions  | User account exists and is active.                                                |
| Postconditions | User is authenticated and redirected to the dashboard.                            |

---

### FR-002 — User Logout

| Attribute      | Description                                                     |
| -------------- | --------------------------------------------------------------- |
| Requirement ID | FR-002                                                          |
| Priority       | High                                                            |
| Actor          | Owner, Cashier                                                  |
| Description    | The system shall allow authenticated users to securely log out. |
| Preconditions  | User is logged in.                                              |
| Postconditions | User session is terminated and redirected to the login page.    |

---

### FR-003 — Role-Based Authorization

| Attribute      | Description                                                                |
| -------------- | -------------------------------------------------------------------------- |
| Requirement ID | FR-003                                                                     |
| Priority       | High                                                                       |
| Actor          | System                                                                     |
| Description    | The system shall grant access to features based on the assigned user role. |
| Preconditions  | User is authenticated.                                                     |
| Postconditions | Unauthorized modules remain inaccessible.                                  |

---

# 10.2 Dashboard Module

### FR-004 — Dashboard Overview

| Attribute      | Description                                                          |
| -------------- | -------------------------------------------------------------------- |
| Requirement ID | FR-004                                                               |
| Priority       | High                                                                 |
| Actor          | Owner                                                                |
| Description    | The system shall display business statistics after successful login. |

Dashboard shall include:

* Today's Sales
* Monthly Sales
* Total Products
* Total Customers
* Total Suppliers
* Low Stock Products

---

### FR-005 — Dashboard Charts

| Attribute      | Description                                            |
| -------------- | ------------------------------------------------------ |
| Requirement ID | FR-005                                                 |
| Priority       | Medium                                                 |
| Actor          | Owner                                                  |
| Description    | The dashboard shall display graphical sales analytics. |

Charts include:

* Weekly Sales
* Monthly Sales
* Best Selling Products

---

# 10.3 Product Management

### FR-006 — Add Product

| Attribute      | Description                                           |
| -------------- | ----------------------------------------------------- |
| Requirement ID | FR-006                                                |
| Priority       | High                                                  |
| Actor          | Owner                                                 |
| Description    | The system shall allow the owner to add new products. |

Product Information:

* Product Name
* SKU
* Barcode
* Category
* Brand
* Purchase Price
* Selling Price
* Unit
* Current Stock
* Minimum Stock
* Product Image (Optional)

---

### FR-007 — Update Product

| Attribute      | Description                                                     |
| -------------- | --------------------------------------------------------------- |
| Requirement ID | FR-007                                                          |
| Priority       | High                                                            |
| Actor          | Owner                                                           |
| Description    | The owner shall be able to modify existing product information. |

---

### FR-008 — Soft Delete Product

| Attribute      | Description                                                          |
| -------------- | -------------------------------------------------------------------- |
| Requirement ID | FR-008                                                               |
| Priority       | Medium                                                               |
| Actor          | Owner                                                                |
| Description    | Products shall be marked as inactive instead of permanently deleted. |

---

### FR-009 — Product Search

| Attribute      | Description                                           |
| -------------- | ----------------------------------------------------- |
| Requirement ID | FR-009                                                |
| Priority       | High                                                  |
| Actor          | Owner, Cashier                                        |
| Description    | Products shall be searchable by multiple identifiers. |

Supported Search Methods:

* Product Name
* Barcode
* SKU

---

### FR-010 — Product Variants

| Attribute      | Description                                                       |
| -------------- | ----------------------------------------------------------------- |
| Requirement ID | FR-010                                                            |
| Priority       | Medium                                                            |
| Actor          | Owner                                                             |
| Description    | Products may contain multiple variants such as size or packaging. |

Example:

* Pepsi 250ml
* Pepsi 500ml
* Pepsi 1L

---

# 10.4 Category Module

### FR-011 — Manage Categories

The system shall allow the owner to:

* Create Categories
* Edit Categories
* Deactivate Categories
* View Categories

---

# 10.5 Brand Module

### FR-012 — Manage Brands

The system shall allow the owner to:

* Create Brands
* Edit Brands
* Deactivate Brands

---

# 10.6 Supplier Module

### FR-013 — Manage Suppliers

The owner shall be able to:

* Add Supplier
* Edit Supplier
* View Supplier
* View Purchase History

---

# 10.7 Customer Module

### FR-014 — Manage Customers

The system shall allow:

* Add Customer
* Edit Customer
* View Customer Purchase History

Customer information shall include:

* Name
* Phone Number
* Address (Optional)

# 10.8 Purchase Management

### FR-015 — Record Purchase

| Attribute      | Description                                                                  |
| -------------- | ---------------------------------------------------------------------------- |
| Requirement ID | FR-015                                                                       |
| Priority       | High                                                                         |
| Actor          | Owner                                                                        |
| Description    | The system shall allow the owner to record product purchases from suppliers. |

Purchase information shall include:

* Supplier
* Purchase Date
* Products
* Quantity
* Purchase Price
* Total Amount

---

### FR-016 — Automatic Stock Update

| Attribute      | Description                                                                                                              |
| -------------- | ------------------------------------------------------------------------------------------------------------------------ |
| Requirement ID | FR-016                                                                                                                   |
| Priority       | High                                                                                                                     |
| Actor          | System                                                                                                                   |
| Description    | After a purchase is completed, the system shall automatically increase the inventory quantity of the purchased products. |

---

### FR-017 — Purchase History

The system shall maintain complete purchase records for future reference.

---

# 10.9 Sales Management

### FR-018 — Create Sale

| Attribute      | Description                                                    |
| -------------- | -------------------------------------------------------------- |
| Requirement ID | FR-018                                                         |
| Priority       | High                                                           |
| Actor          | Owner, Cashier                                                 |
| Description    | The system shall allow users to create new sales transactions. |

---

### FR-019 — Shopping Cart

The system shall provide a shopping cart where users can:

* Add products
* Remove products
* Update quantities
* View subtotal
* View total amount

---

### FR-020 — Cash Payment

The system shall support cash payments in Version 1.

---

### FR-021 — Automatic Inventory Deduction

After a sale is completed, the system shall automatically reduce product stock.

---

### FR-022 — Sales History

The system shall maintain complete sales records including:

* Invoice Number
* Date
* Products
* Quantity
* Selling Price
* Total Amount
* Cashier

---

# 10.10 Inventory Management

### FR-023 — Stock Tracking

The system shall maintain accurate stock levels for every product.

---

### FR-024 — Low Stock Alert

The system shall notify the owner when stock falls below the minimum stock quantity.

---

### FR-025 — Inventory Report

The system shall generate reports showing:

* Current Stock
* Low Stock Products
* Out-of-Stock Products

---

# 10.11 Reporting Module

### FR-026 — Daily Sales Report

The system shall generate daily sales reports.

---

### FR-027 — Monthly Sales Report

The system shall generate monthly sales reports.

---

### FR-028 — Product Report

The system shall generate reports containing product information.

---

### FR-029 — Inventory Report

The system shall generate inventory reports.

---

### FR-030 — Best Selling Products

The system shall display the best-selling products based on sales quantity.

---

# 11. Non-Functional Requirements

## 11.1 Performance

### NFR-001

The system shall respond to user requests within two seconds under normal operating conditions.

### NFR-002

The system shall support multiple concurrent users without noticeable performance degradation.

---

## 11.2 Security

### NFR-003

Passwords shall be securely hashed before storage.

### NFR-004

Only authenticated users shall access protected resources.

### NFR-005

Authorization shall be enforced based on user roles.

### NFR-006

Sensitive configuration values shall be stored using environment variables.

---

## 11.3 Reliability

### NFR-007

The system shall maintain data consistency during sales and purchase transactions.

### NFR-008

Unexpected failures shall not corrupt stored business data.

---

## 11.4 Maintainability

### NFR-009

The backend shall follow the MVC architectural pattern.

### NFR-010

The application shall use a modular folder structure.

### NFR-011

Source code shall follow consistent coding standards and naming conventions.

---

## 11.5 Scalability

### NFR-012

The system architecture shall support future expansion, including:

* Multiple branches
* Additional payment methods
* Receipt printing
* Mobile application
* AI-powered business insights

---

## 11.6 Usability

### NFR-013

The user interface shall remain simple, clean, and user-friendly.

### NFR-014

Navigation shall remain consistent throughout the application.

### NFR-015

All forms shall provide meaningful validation messages and user feedback.

---

# 12. Business Rules

**BR-001:** Every product shall belong to one category.

**BR-002:** Every product shall have one selling price.

**BR-003:** Stock quantity shall never become negative.

**BR-004:** Only the Owner may manage users and system settings.

**BR-005:** Completing a sale shall automatically reduce inventory.

**BR-006:** Recording a purchase shall automatically increase inventory.

**BR-007:** Inactive products shall not appear in the sales interface.

**BR-008:** Cashiers shall not access administrative modules.

**BR-009:** Every completed sale shall generate a unique invoice number.

**BR-010:** Every product shall have a unique SKU.

# 13. Use Cases

## UC-001 User Login

**Primary Actor:** Admin, Cashier

**Description:**
Allows registered users to securely log in to the NTI POS system.

**Preconditions:**

* User account exists.
* User account is active.

**Main Flow:**

1. User enters email and password.
2. System validates the credentials.
3. System authenticates the user.
4. User is redirected to the dashboard.

**Postconditions:**

* User session is established.

---

## UC-002 Add Product

**Primary Actor:** Admin

**Description:**
Allows the administrator to add a new product to the inventory.

**Preconditions:**

* Admin is logged in.

**Main Flow:**

1. Admin opens the Products module.
2. Admin clicks **Add Product**.
3. Admin enters product information.
4. System validates the input.
5. Product is saved successfully.

**Postconditions:**

* Product becomes available for sales.

---

## UC-003 Create Sale

**Primary Actor:** Admin, Cashier

**Description:**
Allows users to create a new sales transaction.

**Preconditions:**

* User is logged in.
* Products exist in inventory.

**Main Flow:**

1. User searches or scans a product.
2. User adds products to the cart.
3. User reviews the cart.
4. User receives a cash payment.
5. User confirms the sale.
6. System generates an invoice.
7. System deducts stock automatically.

**Postconditions:**

* Sale is recorded.
* Inventory is updated.

---

## UC-004 Record Purchase

**Primary Actor:** Admin

**Description:**
Allows the administrator to record purchases from suppliers.

**Preconditions:**

* Admin is logged in.

**Main Flow:**

1. Admin opens the Purchases module.
2. Admin selects a supplier.
3. Admin adds purchased products.
4. Admin saves the purchase.
5. System updates inventory.

**Postconditions:**

* Purchase history is stored.
* Stock levels are increased.

---

# 14. System Constraints

The following constraints apply to Version 1 of NTI POS:

* The application supports a single retail branch.
* Cash is the only supported payment method.
* Internet connectivity is required.
* Receipt printing is not included.
* Product expiry management is not included.
* The application is intended for web browsers.
* Only authenticated users can access protected modules.

---

# 15. Acceptance Criteria

The project shall be considered complete when the following requirements are satisfied:

* Users can securely log in.
* Admin can manage users.
* Admin can manage products, categories, brands, suppliers, and customers.
* Purchases automatically increase stock.
* Sales automatically decrease stock.
* Dashboard displays business statistics.
* Reports are generated successfully.
* Role-based authorization is enforced.
* All major modules are integrated and functional.

---

# 16. Future Enhancements

Future releases of NTI POS may include:

* Multi-branch support
* Online payment integration
* Thermal receipt printing
* Barcode label generation
* Customer loyalty program
* Mobile application
* Multi-language support
* Multi-currency support
* AI-powered sales forecasting
* AI-based inventory recommendations
* Cloud backup and synchronization
* Advanced business analytics

---

# 17. Conclusion

This Software Requirements Specification defines the functional and non-functional requirements for NTI POS. The document serves as the foundation for system analysis, design, implementation, testing, deployment, and future maintenance.

The system is designed using the MERN stack and follows the MVC architectural pattern with a service layer to ensure scalability, maintainability, and clean separation of responsibilities. The requirements documented in this specification provide a clear roadmap for developing a secure, efficient, and user-friendly Point of Sale system for small and medium-sized retail businesses.

---

