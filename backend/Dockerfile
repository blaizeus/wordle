FROM python:3.11.0-slim-bullseye

# disable automatic check for pip update
ENV PIP_DISABLE_PIP_VERSION_CHECK 1
# prevent python from writing .pyc files
ENV PYTHONDONTWRITEBYTECODE 1
# ensure console output not buffered by docker
ENV PYTHONUNBUFFERED 1

# sets default working dir for rest of commands
WORKDIR /app

COPY requirements.txt requirements.txt

RUN pip install -r requirements.txt

COPY ./scripts/entrypoint.sh ./scripts/start.sh /
RUN chmod a+x /entrypoint.sh
RUN chmod a+x /start.sh

COPY . .

