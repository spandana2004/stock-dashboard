# 🚀 Multi-Stock Live Dashboard - DevOps Project

This repository contains a live stock dashboard application deployed to Azure Kubernetes Service (AKS) using a CI/CD pipeline orchestrated by Jenkins, Docker, and GitHub.

The project demonstrates a full DevOps workflow, from application development and containerization to automated deployment to a cloud-based container orchestration platform.

## ✨ Features

*   **Live Stock Data:** Displays real-time stock prices and daily changes for selected tickers (IBM, AAPL, TSLA, MSFT) using the Twelve Data API.
*   **React Frontend:** Interactive and responsive user interface for displaying stock information.
*   **Node.js Backend (Express):** Serves API requests for stock data and also serves the static React frontend in production.
*   **Dockerized Application:** The entire application (frontend and backend) is containerized into a single Docker image for consistent deployment.
*   **Automated CI/CD:** A Jenkins pipeline automates the build, push, and deployment process upon changes to the GitHub repository.
*   **Kubernetes Deployment:** Deploys the Dockerized application to Azure Kubernetes Service (AKS) for scalable and resilient hosting.
*   **Publicly Accessible:** Exposed via an Azure LoadBalancer service, making the application accessible from anywhere.

## 🛠️ Technologies Used

*   **Frontend:** React.js
*   **Backend:** Node.js, Express.js, Axios
*   **API:** Twelve Data
*   **Containerization:** Docker
*   **Version Control:** Git, GitHub
*   **CI/CD:** Jenkins
*   **Cloud Platform:** Microsoft Azure
*   **Orchestration:** Kubernetes (AKS)

## 📁 Repository Structure

```
.
├── public/                 # React public assets
├── src/                    # React source code (App.js, etc.)
├── server/
│   ├── server.js           # Node.js Express backend
│   ├── package.json        # Backend dependencies
│   └── package-lock.json
├── Dockerfile              # Instructions to build the Docker image
├── Jenkinsfile             # Jenkins Pipeline definition
├── deployment.yaml         # Kubernetes deployment and service manifests
├── package.json            # React frontend dependencies
├── package-lock.json
└── README.md               # This file
```

## 🚀 Deployment Status

The application is deployed to Azure Kubernetes Service and is currently accessible at:
[http://20.219.182.201](http://20.219.182.201)
