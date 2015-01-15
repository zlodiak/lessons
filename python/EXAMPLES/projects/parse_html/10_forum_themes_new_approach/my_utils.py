import requests


def get_doc(url, post='', headers=''):
    try:
        req = requests.post(url, params=post, headers=headers)
    except requests.exceptions.ConnectionError as exc:
        print('A Connection error occurred.', exc)
    else:
        return req
