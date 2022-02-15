# DelSOS Requirements and Specifications
## Table Of Content 
- [1. INTRODUCTION](#1-introduction)
  - [1.1 Document Purpose](#11document-purpose)
  - [1.2 Product Scope](#12product-scope)
- [2. OVERALL DESCRIPTION](#2overall-description)
  - [2.1	Product Perspective](#21product-perspective)
  - [2.2	Product Functionality](#22product-functionality)
  - [2.3	Users and Characteristics](#23users-and-characteristics)
  - [2.4	Operating Environment](#24operating-environment)
  - [2.5	Design and Implementation Constraints](#25design-and-implementation-constraints)
  - [2.6 User Documentation](#26user-documentation)
- [3.	SPECIFIC REQUIREMENTS](#3specific-requirements)
  - [3.1	External Interface Requirements](#31external-interface-requirements)
  - [3.2	Functional Requirements](#32functional-requirements)
  - [3.3 Behaviour Requirements ***(USECASE)*** ](#33behaviour-requirements)
- [4. NON-FUNCTIONAL REQUIREMENTS](#4-non-functional-requirements)
  - [4.1  Performance Requirements](#41performance-requirements)
  - [4.2 Safety and Security Requirements](#42safety-and-security-requirements)


## 1. INTRODUCTION

### 1.1	Document Purpose

This document presents a detailed explanation of the objectives, features, user interface and application of DelSOS in real life. It will also describe how the system will perform and under which it must operate. In this document it will be also shown user interface. Both the stakeholders and the developers of the system can benefit from this document.

### 1.2	Product Scope

This system will help to manage and run the delivery business systematically. In this management system, we will provide an app that can be used by the anyone to deliver packages.<br />
 This will ultimately lead to hire less delivery persons and create an opportunity to make more deliveries and deliver them in less time . <br />
 All the information about daily expenses and profit will be saved in the system. 
Also, the required information  about employees will be saved in the system which can be only accessed by the system admin.

-------------------------------------------------------------------------------------------------------------------------

## 2.	OVERALL DESCRIPTION
###  2.1	Product Perspective
The Delivery platform helps the shoppers deliver orders and the stores to become parterns  and benefit from the delivery services that DelSOS offers.
The system processes transactions and stores the resulting data. Reports will be generated from these data which helps the admin track them and manage the deliveries and the accounts as well as get notified of issues and claims to deal with them.

The whole platform is designed for a general Computerized Digital Delivery Service. So that any shopper can deliver and receive deliveries through it after registration.

### 2.2	Product Functionality

Whole functions will performed through this order.


-	Delivery Order via website or app

-	Receive the ordered goods

-	Deliver the ordered items to the address

-	Payment

-	Shopper Information

-	Customer Review

### 2.3	Users and Characteristics
DelSOS platform has 4 active actors and one cooperating system. 

The shopper can access the system through wifi connection and order a delivery. 
The Shopper can order a delivery , deliver it to the customer if he is available  and confims the order 
or he could deliver it to one of our alternative : 
- to the neighbour 
- to the nearest pickup point 
- in his front door 
the shopper can confirm order and add the extra details before that. 

The shop can access the system to track  payment and deliveries' history. 
The Admin can have a total overview on the platform upcomming, count total earning and expenditure and manages the users accounts and the deliveries.
The system pays the shoppers for each delivery after a determined time when the delivery is confirmed.


### 2.4	Operating Environment


#### Operating System 
- All operating systems that can run the browser.
- Android and iOS Operating Systems for the mobile app.
#### Languages 
- Backend : Java spring boot 
- Frontend : Typescript, Angular
#### Database 
- Postgresql


### 2.5	Design and Implementation Constraints


There are some constraints which costs more for the system. If those constraints can overcome then this whole system will perform best. They are-

1.	IOS App and Windows App.
2.	Information flow or data flow can be controlled and more effective.
3.	Faster server system such as LINUX server.

### 2.6	User Documentation

It will provide:
Specific guidelines (help) page. 
A Frequently Asked Questions (FAQ) page.
User conditions and requirements for registration.

-------------------------------------------------------------------------------------------------------------------------

## 3.	SPECIFIC REQUIREMENTS

### 3.1	External Interface Requirements


There are many types of interfaces as such: 
- User Interface
- Hardware Interface
- Software Interface 


#### 3.1.1	User Interfaces

The user interface will be implemented using any browser. This interface will be user friendly. So that every kind of customer can place the delivery order easily. 
Customers can also give feedback through it easily with some demo comment or if they are keen to write their review by own they can do it.


#### 3.1.2	Hardware Interfaces

There shall be logical address of the system in IPv6 format.


#### 3.1.3	Software Interfaces

The system shall communicate with the Configurator to identify all the available components to configure the product.
The system shall communicate with the admin to get the product specifications.
 


### 3.2	Functional Requirements


#### 3.2.1	Accept Delivery Order via App
The shopper can consult the delivery list and accept one of them from the app but it needs specific wifi connection.


#### 3.2.2	Take Delivery
The shopper will take the delivery order and if it is available then he will accept it and go to the delivery pickup point.


#### 3.2.3	Delivering the ordered goods
After arriving to the customer address and delivering the goods the shopper can mark the delivery status as confirmed and the customer can confirm that he received the delivery.


#### 3.2.4	Payment
The customer pays the shop. The shop will transfer the payment to our system. After the delivery is confirmed by both the customer and the shopper, then after a determined delay, the shopper will recieve his payment.
 

#### 3.2.5	Shopper Information

The shopper has to get registered to be able to order a delivery and to deliver through our platform.


#### 3.2.6	Customer Review

The shopper can give overall review about the delivery person and services.

### 3.3	Behaviour Requirements

### Usecase 
<img src="https://github.com/DelSOS/DelSOS-back/blob/main/conception/SRS/usecase.PNG" alt="usecase"   />


-------------------------------------------------------------------------------------------------------------------------
#### Visitor Use Case

 ***Use case*** : Subscription
 
 - Description
 
 <img src="https://github.com/DelSOS/DelSOS-back/blob/main/conception/SRS/subscription.png" alt="us"   />
 
 -------------------------------------------------------------------------------------------------------------------------

#### Shopper Use Case


 ***Use case*** : Consult deliveries and pickout a delivery
 
- Description

|<img src="https://github.com/DelSOS/DelSOS-back/blob/main/conception/SRS/pickout.png" alt="us"   />| <img src="https://github.com/DelSOS/DelSOS-back/blob/main/conception/SRS/delivery.png" alt="us" />|
|---|---|

 ***Use case*** : Getting payed
 
- Description: 
   - The Shopper can only take payment from DelSOS platform.

-------------------------------------------------------------------------------------------------------------------------
#### Admin Use Case

***Use case*** :	Manage deliveries

- Description
  - The admin can view the deliveries information and status. 
  - He gets notified if any problem occurs.

***Use case*** :	Manage accounts

- Description
   - The admin can see the account information and delete accounts.


***Use case*** :	Maintain System

- Description
  - The Admin has full access to the system. He maintains the whole system to ensure better and secure service and solves any error appeared in the system.


-------------------------------------------------------------------------------------------------------------------------
### Sequence 


#### Consult the list and pickout a delivery

<img src="https://github.com/DelSOS/DelSOS-back/blob/main/conception/Sequence%20digram/pickout%20seq.png" alt="pickout" />

##### cancel case 

<img src="https://github.com/DelSOS/DelSOS-back/blob/main/conception/Sequence%20digram/cancel%20seq.png" alt="pickout" />

##### Delivery Process 
<img src="https://github.com/DelSOS/DelSOS-back/blob/main/conception/Sequence%20digram/seq%20delivery.png" alt="pickout" />

## 4. NON-FUNCTIONAL REQUIREMENTS	

### 4.1	Performance Requirements

-	The product will be based on local server.

-	The product will take initial load time.

-	The performance will depend upon hardware components.

-	Payment system will be fully secure through POS system.

-	Different database for employee.


### 4.2	Safety and Security Requirements


-	The source code developed for this system shall be maintained in configuration management tool.
- The whole system is secured. Only Admin can access all the data.
- This system will use HTTPS. Because of this protocol this is more secure.
- This system will use secured POS system.




