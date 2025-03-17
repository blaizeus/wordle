#!/bin/bash

set -o errexit
set -o pipefail
set -o nounset

db_ready() {
python << END

import sys
import psycopg2
import os

print("Attempting to connect to DB ...")

try:
    psycopg2.connect(
        dbname = os.environ.get('APP_DB_NAME'),
        user = os.environ.get('APP_DB_USER'),
        password = os.environ.get('APP_DB_PASS'),
        host = os.environ.get('POSTGRES_HOST'),
        port = os.environ.get('POSTGRES_PORT')
    )
except psycopg2.OperationalError as e:
    print(e)
    sys.exit(-1)
sys.exit(0)
END
}

until db_ready; do
    >&2 echo 'Waiting for PostgreSQL to become available ...'
    sleep 1
done
>&2 echo 'PostgreSQL is available'

exec "$@"
