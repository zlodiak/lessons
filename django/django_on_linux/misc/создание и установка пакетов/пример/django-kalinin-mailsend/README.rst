Quick start
-----------

1. Add "polls" to your INSTALLED_APPS setting like this::

      INSTALLED_APPS = (
          ...
          'mailsend',
      )

2. Include the polls URLconf in your project urls.py like this::

      url(r'^mailsend/', include('mailsend.urls')),

3. Run `python manage.py syncdb` to create the mailsend models.


5. Visit http://127.0.0.1:8000/mailsend/ to participate in the mailsend.