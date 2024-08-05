pipeline {
    agent any

    stages {
        stage('Build and Run') {
            steps {
                sh 'docker compose -f docker-compose.db.yml up -d'
                sh 'docker compose up -d --build'
            }
        }
    }
}
