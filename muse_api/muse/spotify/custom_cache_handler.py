"""
This module implements a cache handler for the  spotipy library.
By default the cache is stored on a file called .cache on the
main project folder.
Here is an example of some custom Cache handlers:
    https://github.com/plamere/spotipy/blob/master/spotipy/cache_handler.py
"""
from spotipy.cache_handler import CacheHandler


class MemoryCacheHandler(CacheHandler):
    """
    In memory implementation of the CacheHandler abstract base class.
    Saves the token data in memory for the lifetime of the object.
    """ 
    def __init__(self, token_info=None):
        """
        Constructors.
        Args:
            token_info: The token information to be stored in memory.
        """
        self.token_info = token_info

    def get_cached_token(self):
        return self.token_info

    def save_token_to_cache(self, token_info):
        self.token_info = token_info
