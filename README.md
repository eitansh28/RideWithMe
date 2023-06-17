# RideWithMe

![image](https://github.com/Matan-Shimon/RideWithMe/assets/63747865/8644fdab-edd2-4dba-b9b4-7bb12681c397)


## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Screenshots](#screenshots)

## Introduction

RideWithMe is a hitchhiking app designed to connect passengers in need of a ride with drivers who are willing to offer a ride along their route. Unlike other apps that focus on direct routes from a starting point to a destination, RideWithMe prioritizes convenience and flexibility by connecting drivers and passengers along the fastest route, even if it requires multiple drivers.

This README provides an overview of the RideWithMe app, including its features, installation instructions, and usage guidelines.

## Features

RideWithMe offers the following key features:

1. **Publish and Search Rides**: Passengers can easily publish their ride requests, specifying their starting point, destination, and preferred time. Drivers can search for available rides and choose the ones that align with their route.

2. **Fastest Routes Optimization**: RideWithMe algorithmically determines the fastest route for passengers by considering available drivers along the way. This ensures efficient and timely ridesharing experiences for both drivers and passengers. The app utilizes Yen's algorithm, a well-known algorithm for finding the K shortest paths in a graph, to calculate the fastest routes that optimize travel time and minimize detours.

3. **Multi-Driver Rides**: RideWithMe allows passengers to request rides that involve multiple drivers. This feature helps optimize routes and increases the likelihood of finding suitable drivers, enhancing the convenience of the app.

## Installation

To install and set up RideWithMe, follow these steps:

1. Clone the repository from GitHub:
git clone https://github.com/your-username/RideWithMe.git
2. Install the required dependencies using package manager [npm](https://www.npmjs.com/):
npm install
3. Configure the database connection and app settings by updating the configuration files. Make sure to set the appropriate credentials and environment variables.

4. Start the RideWithMe server:
* npm start
* npx react-native run-android
5. Access the RideWithMe app by opening your preferred web browser and navigating to `http://localhost:1000`.

## Usage

### Post a Ride:

1. On the RideWithMe app's home screen, navigate to the "Post Ride" section.

2. Provide the details of your ride, including the starting point, destination, departure time, and any associated costs.

3. Specify the number of available seats in your vehicle and any specific preferences or requirements you may have for passengers.

4. Click the "Post" button to publish your ride.

5. Once your ride is posted, interested passengers can browse and request to join your ride.

6. Review the ride requests from passengers and their profiles. Evaluate their suitability based on your preferences and any additional information they provide.

7. Accept or decline ride requests based on your availability and preferences.

### Search a Ride:

1. On the RideWithMe app's home screen, navigate to the "Search Rides" section.

2. Specify your starting point, destination, and preferred time for the ride. You can also set any additional preferences, such as the number of available seats or any specific requirements you may have.

3. Click the "Search" button to initiate the search.

4. Browse through the list of available rides that match your search criteria. Each ride listing includes essential details such as the driver's profile, the starting point, the destination, the departure time, and any associated costs.

5. Review the ride details, driver's ratings, and any additional information provided by the driver.

6. Once you find a suitable ride, click on the "Ask To Join" button to send a ride request to the driver. Optionally, you can use the in-app messaging system to communicate with the driver and discuss any specific requirements or details.

7. Wait for the driver's response to your ride request. The driver will confirm or decline your request based on their availability and preferences.

8. If your ride request is accepted, you will see it inside "Joined Rides".

<p align="center">
  <img src="https://github.com/Matan-Shimon/RideWithMe/assets/63747865/6a2993ff-8f4a-4b80-bb43-6de3928d4e86" alt="Image Description">
</p>

## Screenshots
* Log In

![image](https://github.com/Matan-Shimon/RideWithMe/assets/63747865/6a66985d-0bbd-4862-a565-55512f9a3fc9)

* Home Page

![image](https://github.com/Matan-Shimon/RideWithMe/assets/63747865/b5ef0eab-c652-49ee-9ab0-51bc9a7f7309)

* Profile

![image](https://github.com/Matan-Shimon/RideWithMe/assets/63747865/d268842f-70bd-45dc-bb42-c3052ff7f679)



