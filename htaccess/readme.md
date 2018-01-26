# .htaccess
This is a collection of useful .htaccess snippets.

## How to activate .htaccess file [OS X]
- Enable `rewrite_module` apache module in `/etc/apache2/httpd.conf` file
- Update apache host configuration file

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
Redirect 301 /service.html http://www.example.com/my-service/

# Redirect entire site to new site
Redirect 301 / http://newsite.com/
```

## Using RedirectMatch
```
RedirectMatch 301 /product(.*) http://www.newsite.com/product/$1
RedirectMatch 301 ^/category/(.*)$ /$1
```

## Prevent directory listings
```
Options All -Indexes
```

## Set 404 Error Page

```
ErrorDocument 404 /path/to/404.html
```

## Adding the www
```
RewriteEngine on
RewriteCond %{HTTP_HOST} ^example.com$ [NC]
RewriteRule ^(.*)$ http://www.example.com/$1 [L,R=301,NC]
# RewriteRule ^ http://www.%{HTTP_HOST}%{REQUEST_URI} [L,R=301,NC]
```

## Removing the www
```
RewriteEngine on
RewriteCond %{HTTP_HOST} ^www.example.com$ [NC]
RewriteRule ^(.*)$ http://example.com/$1 [L,R=301,NC]
```

### Forcing https
```
RewriteEngine on
RewriteCond %{HTTPS} !on
RewriteRule (.*) https://%{HTTP_HOST}%{REQUEST_URI}
```

## Adding a trailing slash to paths
```
RewriteEngine on
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_URI} !(\.[a-zA-Z0-9]{1,5}|/)$
RewriteRule ^(.*)$ $1/ [R=301,L]

OR,

RewriteEngine on
RewriteCond %{REQUEST_URI} /+[^\.]+$
RewriteRule ^(.+[^/])$ %{REQUEST_URI}/ [R=301,L]
```

## Removing trailing slash from paths
```
RewriteEngine on
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_URI} (.+)/$
RewriteRule ^ %1 [R=301,L]
```


## Prevent viewing of .htaccess file
```
<Files .htaccess>
order allow,deny
deny from all
</Files>
```

## Advance .htaccess example
```
RewriteEngine on

# Prevent directory listings
Options All -Indexes

# Rewrite rule for example1.com domain
RewriteCond %{HTTP_HOST} !^.+\example1.com$
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{DOCUMENT_ROOT}/category1/$1.html -f
RewriteRule ^(.*)$  /category1/$1.html [L,R=301]
RewriteRule ^(.*)$ -

# Rewrite rule for example2.com domain
RewriteCond %{HTTP_HOST} !^.+\example2.com$
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{DOCUMENT_ROOT}/category2/$1.html -f
RewriteRule ^(.*)$  /category2/$1.html [L,R=301]
RewriteRule ^(.*)$ - [L]

# 404 Error page
ErrorDocument 404 /39/404.php
```

## Learn More
.htaccess cheatsheet [url](https://www.cheatography.com/davechild/cheat-sheets/mod-rewrite/)
or view [pdf](mod-rewrite-cheatsheet.pdf) file
