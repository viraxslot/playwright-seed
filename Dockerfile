FROM mcr.microsoft.com/playwright:v1.9.0-focal
USER root
RUN mkdir -p /home/tests
WORKDIR /home/tests

COPY . .

RUN npm ci && chmod 777 entrypoint.sh
CMD ["/bin/bash", "./entrypoint.sh"]