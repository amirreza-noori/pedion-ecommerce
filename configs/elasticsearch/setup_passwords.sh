#!/bin/bash
# /usr/local/bin/setup_passwords.sh

# This script is designed to run as an entrypoint for the Elasticsearch container.
# It sets the initial passwords and creates the Kibana system user if this is the first run.

# Function to check if Elasticsearch is ready
wait_for_es() {
    echo "Waiting for Elasticsearch to start..."
    # Use the passed ELASTIC_USERNAME and ELASTIC_PASSWORD for authentication
    until curl -s -u "${ELASTIC_USERNAME}:${ELASTIC_PASSWORD}" http://localhost:9200/_cluster/health -o /dev/null; do
        sleep 2
    done
    echo "Elasticsearch is up and running."
}

# Check if the "elastic_data" volume is empty (first run)
# We can check for a specific file that Elasticsearch creates after initial setup
if [ ! -f /usr/share/elasticsearch/data/nodes/0/_state/node-0.st ]; then
    echo "First run detected, setting up Elasticsearch passwords and users."

    # Start Elasticsearch in background for initial setup
    /usr/local/bin/docker-entrypoint.sh elasticsearch &
    ES_PID=$!

    # Wait for Elasticsearch to become available
    wait_for_es

    echo "Setting passwords for built-in users..."

    # Create the Kibana system user
    echo "Creating Kibana system user: ${KIBANA_USERNAME}" # این خط باید نام کاربری را نشان دهد

    # IMPORTANT: The URI must include the username for user creation
    curl -X POST "http://localhost:9200/_security/user/${KIBANA_USERNAME}" \
        -H "Content-Type: application/json" \
        -u "${ELASTIC_USERNAME}:${ELASTIC_PASSWORD}" \
        -d'{"password" : "'"${KIBANA_PASSWORD}"'", "roles" : ["kibana_system"]}' \
        --silent --show-error --insecure # --insecure for self-signed certs in dev

    # Check if user creation was successful (by checking curl's exit code, not just previous output)
    if [ $? -eq 0 ]; then
        echo "Kibana user creation command executed. Check Elasticsearch logs for actual success/failure."
    else
        echo "Error executing curl command for Kibana user creation. Curl exited with status $?."
        # Exit if user creation command failed to prevent further issues for Kibana trying to connect
        exit 1
    fi

    echo "Initial setup complete."
    # Kill the background Elasticsearch process as the main entrypoint will start it again
    kill $ES_PID
    wait $ES_PID # Wait for it to properly exit
else
    echo "Elasticsearch data volume already exists. Skipping password setup."
fi

# Finally, execute the original Elasticsearch entrypoint to start the service
exec /usr/local/bin/docker-entrypoint.sh elasticsearch
