pipeline {

    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('jenkins-stock-dashboard-pat') 
        DOCKER_IMAGE = "spandanaap/stock-dashboard" 
        IMAGE_TAG = "${BUILD_NUMBER}"
        NAMESPACE = "spandana2004-ns" 
        GITHUB_REPO_URL = "https://github.com/spandana2004/stock-dashboard.git"
    }

    stages {

        stage('Clone Repository') {
            steps {
                git url: "${GITHUB_REPO_URL}",
                    branch: 'main'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    sh "docker build -t ${DOCKER_IMAGE}:${IMAGE_TAG} ."
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    sh """
                    echo "${DOCKERHUB_CREDENTIALS_PSW}" | docker login -u "${DOCKERHUB_CREDENTIALS_USR}" --password-stdin
                    docker push ${DOCKER_IMAGE}:${IMAGE_TAG}
                    docker logout
                    """
                }
            }
        }

        stage('Deploy to AKS') {
            steps {
                script {
                    sh """
                    sed 's|IMAGE_PLACEHOLDER|${DOCKER_IMAGE}:${IMAGE_TAG}|g' deployment.yaml > generated-deployment.yaml

                    # Create the namespace if it doesn't exist (idempotent)
                    kubectl create namespace ${NAMESPACE} --dry-run=client -o yaml | kubectl apply -f -

                    # Apply the deployment and service
                    kubectl apply -f generated-deployment.yaml -n ${NAMESPACE}

                    echo "Deployment to AKS complete. Waiting for pods and service..."
                    echo "Checking pods in namespace ${NAMESPACE}:"
                    kubectl get pods -n ${NAMESPACE}
                    echo "Checking service in namespace ${NAMESPACE}:"
                    kubectl get svc -n ${NAMESPACE}
                    """
                }
            }
        }
    }
}
