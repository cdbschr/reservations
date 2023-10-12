#!/bin/bash

if ! command -v git &> /dev/null
then
    echo "git n'est pas installé. Veuillez l'installer et réessayer."
    exit 1
fi

if ! command -v docker-compose &> /dev/null
then
    echo "docker-compose n'est pas installé. Veuillez l'installer et réessayer."
    exit 1
fi

git clone --depth 1 https://github.com/supabase/supabase

cd supabase/docker
cp .env.example .env

docker compose pull
docker compose up -d

echo "Toutes les étapes ont été effectuées avec succès!"
