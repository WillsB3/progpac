import os
import dj_database_url

SITE_ROOT = os.path.dirname(os.path.realpath(__file__))

DEBUG = True
TEMPLATE_DEBUG = DEBUG

ADMINS = (
    ('Seba', 'sebastian.pawlus@gmail.com'),
)

MANAGERS = ADMINS

DATABASES = {'default': dj_database_url.config(default='postgres://localhost')}

TIME_ZONE = 'Europe/London'
LANGUAGE_CODE = 'en-us'

SITE_ID = 1

USE_I18N = True
USE_L10N = True

MEDIA_ROOT = ''
MEDIA_URL = ''


ADMIN_MEDIA_PREFIX = '/static/admin/'

STATICFILES_FINDERS = (
    'django.contrib.staticfiles.finders.FileSystemFinder',
    'django.contrib.staticfiles.finders.AppDirectoriesFinder',
    'compressor.finders.CompressorFinder',
)

TEMPLATE_LOADERS = (
    'django.template.loaders.filesystem.Loader',
    'django.template.loaders.app_directories.Loader',
)

MIDDLEWARE_CLASSES = (
    'django.middleware.common.CommonMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
)

TEMPLATE_CONTEXT_PROCESSORS = (
    "django.contrib.auth.context_processors.auth",
    "django.core.context_processors.debug",
    "django.core.context_processors.i18n",
    "django.core.context_processors.media",
    "django.core.context_processors.request",
    "django.core.context_processors.static",
    "django.contrib.messages.context_processors.messages",
    "progpac.context_processors.default"
)

INTERNAL_IPS = (
    '127.0.0.1',
    '0.0.0.0'
)

ROOT_URLCONF = 'progpac.urls'

TEMPLATE_DIRS = (
    os.path.join(SITE_ROOT, 'templates'),
    os.path.join(SITE_ROOT, 'levels'),
)

INSTALLED_APPS = (
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.sites',
    'django.contrib.messages',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.staticfiles',

    'storages',
    'compressor',

    'progpac.core',
)

LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'mail_admins': {
            'level': 'ERROR',
            'class': 'django.utils.log.AdminEmailHandler'
        }
    },
    'loggers': {
        'django.request': {
            'handlers': ['mail_admins'],
            'level': 'ERROR',
            'propagate': True,
        },
    }
}

AWS_ACCESS_KEY_ID = os.environ.get('AWS_ACCESS_KEY_ID')
AWS_SECRET_ACCESS_KEY = os.environ.get('AWS_SECRET_ACCESS_KEY')
AWS_STORAGE_BUCKET_NAME = 'progpac'

STATIC_ROOT = os.path.join(SITE_ROOT, '.static')
STATIC_URL = 'http://s3.amazonaws.com/%s/CACHE/' % AWS_STORAGE_BUCKET_NAME

STATICFILES_DIRS = (
    os.path.join(SITE_ROOT, 'static'),
)

COMPRESS_ENABLED = True
COMPRESS_OFFLINE = True

COMPRESS_PRECOMPILERS = (
    ('text/less', './node_modules/less/bin/lessc {infile}'),
    ('application/javascript', './static-dev/limejs/bin/lime.py build game')
)

try:
    from local_settings import *
except ImportError:
    pass