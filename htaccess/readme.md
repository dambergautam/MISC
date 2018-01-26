# .htaccess

## How to activate .htaccess file [OS X]
- Enable `rewrite_module` apache module in `/etc/apache2/httpd.conf` file
- Update apache default host configuration file

```
  sudo vim /etc/apache2/extra/httpd-vhosts.conf

  # Update 'AllowOverride None' to 'AllowOverride All'
  <VirtualHost *:80>
    ServerName example.com
    DocumentRoot "/Users/damber/Sites/example"

      <Directory "/Users/damber/Sites/example">
        AllowOverride All
        Require all granted
      </Directory>
   </VirtualHost>
```
- Restart apache `sudo apachectl restart`

## Test it
The simplest way to test if your .htaccess file is activated, is to intentionally break it.

File: .htaccess

```
  # Below line will encounter 500 Internal Server Error if htaccess is working
  testing-htaccess

  RewriteEngine on

  Redirect 301 /programs /programs.html
```

## Basic redirecting example

Default HTTP status code is 302 which mean temporary redirect whereas 301 means
permanent redirect.

```
Redirect 301 /product.html /category/product.html
```


## Set 404 Error Page

```
ErrorDocument 404 /path/to/404.html
```
