# -*- encoding: utf-8 -*-


{
    'name': 'Google chart api',
    'version': '1.0',
    'depends': ['web'],
    'author': 'Saidi Oussama',
    'category': '',
    'data': [
       'views/gcapi_dashboard_view.xml',
    ],
    'qweb': ["static/src/xml/*.xml"],
    'auto_install': False,
    'installable': True,
    'application': False,
}

