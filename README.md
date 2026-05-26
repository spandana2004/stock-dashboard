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

## ⚙️ How it Works (CI/CD Pipeline)

1.  **Code Commit:** Developers push changes to the `main` branch of this GitHub repository.
2.  **Jenkins Trigger:** A Jenkins pipeline (defined in `Jenkinsfile`) is automatically triggered by the GitHub webhook.
3.  **Build Docker Image:** Jenkins pulls the latest code, then builds a Docker image for the application, including both the React frontend and Node.js backend.
4.  **Push to DockerHub:** The newly built Docker image is tagged with the Jenkins build number and pushed to DockerHub (`spandanaap/stock-dashboard`).
5.  **Deploy to AKS:** Jenkins then uses `kubectl` to update the Kubernetes deployment on the pre-configured Azure Kubernetes Service (AKS) cluster.
    *   It dynamically replaces the image tag in `deployment.yaml` with the newly pushed DockerHub image.
    *   It creates/updates a Kubernetes Deployment and a LoadBalancer Service in your specified namespace (`spandana2004-ns`).
6.  **Application Access:** The Azure LoadBalancer provisions a public IP address, making the application accessible from any web browser.

## 🚀 Deployment Status

The application is deployed to Azure Kubernetes Service and is currently accessible at:
[http://20.219.182.201](http://20.219.182.201)
