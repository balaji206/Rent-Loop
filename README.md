# 📱 RentLoop – Peer-to-Peer Rental Mobile App

RentLoop is a **React Native mobile application** with a **Spring Boot backend** that allows users to **rent out products they own** and **rent products they need** for flexible durations such as **hourly or daily**.

This app promotes the **sharing economy** by helping users save money, reduce waste, and access items on demand.

---

## 🚀 Features

### 👤 User Features
- User authentication (Sign up / Login)
- Browse available products for rent
- Rent products for:
  - ⏱️ 1 hour
  - 📆 1 day
  - ⏳ Multiple days
- View product details (price, availability, owner info)
- Post products for rent
- Manage rented and listed products

### 📦 Product Management
- Add product with images
- Set rental price (hour/day)
- Set availability
- Update or remove listed products

### 🔐 Backend Features
- RESTful APIs using Spring Boot
- Secure authentication
- Product & rental management
- User-product relationships
- Rental duration calculation

---

## 🛠 Tech Stack

### 📱 Mobile App (Frontend)
- **React Native**
- JavaScript / TypeScript
- Axios (API calls)
- React Navigation

### 🌐 Backend
- **Spring Boot**
- Java
- REST APIs
- JPA / Hibernate
- MySQL / PostgreSQL

### 🔧 Tools
- Git & GitHub
- Postman (API testing)
- Android Studio / Emulator

---

## 📂 Project Structure

### 📱 React Native (Frontend)

frontend/
│── src/
│   ├── components/
│   ├── screens/
│   ├── navigation/
│   ├── services/
│   ├── utils/
│── App.js
│── package.json



### 🌐 Spring Boot (Backend)

demo/
│── src/
│   ├── main/
│   │   ├── java/
│   │   │   ├── controller/
│   │   │   ├── service/
│   │   │   ├── repository/
│   │   │   ├── model/
│   │   └── resources/
│   │       └── application.properties



---

### ⚙️ Installation & Setup

### 📱 Frontend (React Native)


#### Clone repository
git clone https://github.com/your-username/rentloop.git

#### Navigate to mobile app
cd rentloop-mobile

#### Install dependencies
npm install

#### Run on Android
npx react-native run-android

### 🌐 Backend (Spring Boot)

#### Navigate to backend folder
cd rentloop-backend

#### Run Spring Boot application
./mvnw spring-boot:run

### 🎯 Use Case

- A user can list a drill machine for rent at ₹50/hour.

- Another user can rent it for 2 hours.

- RentLoop calculates the total price and manages availability.

### 🔮 Future Enhancements

- Online payments

- Ratings & reviews

- Chat between renter and owner

- Location-based product discovery

- Push notifications
