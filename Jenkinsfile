pipeline {
    agent any

    environment {
        IMAGE_NAME = "wlicona10/idp-devops"
        CONTAINER_APP = "idp-devops-a2fyf"
        RESOURCE_GROUP = "rg-idp-devops"
        SUBSCRIPTION_ID = credentials('subscription-id')
        TENANT_ID = credentials('tenant-id')
    }

    stages {

        stage('Checkout') {
            steps {
                git 'https://github.com/wlicona10/idp-devops.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    sh "docker build -t $IMAGE_NAME:latest ."
                }
            }
        }

        stage('Login Docker Hub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'USER', passwordVariable: 'PASS')]) {
                    sh "echo $PASS | docker login -u $USER --password-stdin"
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                sh "docker push $IMAGE_NAME:latest"
            }
        }

        stage('Login Azure') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'azure-sp', usernameVariable: 'APP_ID', passwordVariable: 'PASSWORD')]) {
                    sh """
                    az login --service-principal \
                        --username $APP_ID \
                        --password $PASSWORD \
                        --tenant $TENANT_ID
                    """
                }
            }
        }

        stage('Set Subscription') {
            steps {
                sh "az account set --subscription $SUBSCRIPTION_ID"
            }
        }

        stage('Deploy to Container Apps') {
            steps {
                sh """
                az containerapp update \
                  --name $CONTAINER_APP \
                  --resource-group $RESOURCE_GROUP \
                  --image $IMAGE_NAME:latest
                """
            }
        }
    }
}
