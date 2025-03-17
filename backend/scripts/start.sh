#!/bin/bash

set -o errexit
set -o pipefail
set -o nounset

python manage.py migrate
python manage.py shell <<EOF
from api.models import Word
if not Word.objects.exists():
    Word().populate_words()
Word().select_word()
EOF
python manage.py runserver 0.0.0.0:8000
