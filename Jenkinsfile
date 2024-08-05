pipeline {
    agent any

    stages {
        stage('Run DB') {
            steps {
                sh 'docker compose -f docker-compose.db.yml up -d'
            }
        }

        stage('Build and Run') {
            steps {
                sh 'docker compose up -d --build'
            }
        }
    }
}
