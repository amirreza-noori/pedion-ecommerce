pipeline {
    agent any

    stages {
        stage('Build and Run') {
            steps {
                withCredentials([
                    file(credentialsId: 'envPedionEcommerce', variable: 'envPedionEcommerce')
                ]) {
                    sh 'cp "$envPedionEcommerce" /run/secrets/.env.pedion-ecommerce'
                    sh 'docker compose -f docker-compose.db.yml up -d --build'
                    sh 'sleep 10'
                    sh 'docker compose up -d --build'
                }
            }
        }
    }
}
