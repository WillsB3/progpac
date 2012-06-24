import os

from fabric.api import *
from fabric.contrib.project import rsync_project


remote_path = "/var/www/progpac"

def update_code(remote_path=remote_path):
    local_path = "%s/.." % os.path.dirname(__file__)
    exclude = open("%s/.gitignore" % local_path).read().split("\n")
    exclude.extend([".git*", ".virtualenv/"])

    rsync_project(remote_path, local_path, exclude, delete=True)


def update_requirements():
    with cd(remote_path):
        run("pip install -r requirements.txt -U -E .virtualenv")

# def update_