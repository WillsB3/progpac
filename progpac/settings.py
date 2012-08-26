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
    'staticfiles.finders.FileSystemFinder',
    'staticfiles.finders.AppDirectoriesFinder'
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

    'storages',
    'staticfiles',
    'pipeline',

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
STATICFILES_DIRS = (
    os.path.join(SITE_ROOT, 'static'),
)

STATIC_URL = 'http://s3.amazonaws.com/%s/' % AWS_STORAGE_BUCKET_NAME

STATICFILES_STORAGE = 'pipeline.storage.PipelineStorage'
PIPELINE_YUI_BINARY = '/usr/bin/yui-compressor'
PIPELINE_LESS_BINARY = os.path.join(SITE_ROOT, 'node_modules/less/bin/lessc')
PIPELINE_DISABLE_WRAPPER = False
PIPELINE = True

PIPELINE_JS = {
    'base': {
        'source_filenames': (
            'jquery-1.8.0.min.js',
            'jquery.form.js',
            'less.js',
            'bootstrap/js/bootstrap-dropdown.js',
            'bootstrap/js/bootstrap-modal.js',
            'main.js'
        ),
        'output_filename': 'live.js',
    },
    'game': {
        'source_filenames': (
            'limejs/closure/closure/goog/base.js',
            'game/game.js',
        ),
        'output_filename': 'game.js',
    },
}


PIPELINE_CSS = {
    'base': {
        'source_filenames': (
            'bootstrap/less/bootstrap.less',
            'main.less',
        ),
        'output_filename': 'live.css',
    },
}

PIPELINE_COMPILERS = (
    'pipeline.compilers.less.LessCompiler',
    'progpac.core.complie.GameCompiler',
)


try:
    from local_settings import *
except ImportError:
    pass


