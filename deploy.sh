#!/bin/sh

python progpac/manage.py compress
s3cmd sync -r -P --exclude=* --rinclude="^assets|^images|^admin|^game" progpac/.static/ s3://progpac
git push heroku master
