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

Below example demonstrate two different set of rules for two different domains.

```
RewriteEngine on

# Prevent directory listings
Options All -Indexes

# Rule 1
# Rewrite rule for example1.com domain
RewriteCond %{HTTP_HOST} ^(www\.)?example1\.com$ [NC]
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{DOCUMENT_ROOT}/category1/$1.html -f
RewriteRule ^(.*)$  /category1/$1.html [L,R=301]
RewriteRule ^(.*)$ -

# Rule 2
# Rewrite rule for example2.com domain
RewriteCond %{HTTP_HOST} ^(www\.)?example2\.com$ [OR]
RewriteCond %{HTTP_HOST} ^(www\.)?example2\.net$ [NC]
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{DOCUMENT_ROOT}/category2/$1.html -f
RewriteRule ^(.*)$  /category2/$1.html [L,R=301]
RewriteRule ^(.*)$ - [L]

# 404 Error page
ErrorDocument 404 /404.php
```

**Explanation Rule 1**

If following rule set matched  
- domain name regardless of `www`
- and requested file is not directory
- and requested file is not valid file
- and requested file exists inside `root_dir/category1` directory

then go to `example1.com/category1/*` otherwise do nothing.

**Explanation Rule 2**

If following rule set matched  
- domain name is example2.com OR example2.net regardless of `www`
- and requested file is not directory
- and requested file is not valid file
- and requested file exists inside `root_dir/category2` directory

then go to `example2.com/category2/*` otherwise do nothing.

## Useful regex characters
**Flags**

- `[F]`   : Return a 403 forbidden http status code
- `[L]`   : 'Last rule' which means stop processing rules
- `[R]`   : Redirect to new URL using optional http code (301, 302 etc)
- `[NC]`  : Case-insensitive match
- `[QSA]` : Append query string
- `[OR]`  : Combined next rule with `OR` operator (Default is `AND`)

**Other**
- `^` : Start of regex string (`RedirectMatch 301 ^domain/(.*)$ /$1`)
- `$` : End of regex string
- `?` : Zero or more of preceding character (`^(www)?example.com`)
- `.` : Any single character
- `.*` : Match everything or nothing (`^domain.*` => `domain.com, domain, domain.com.net`) 
- `-` :  Do not apply rewrite rule `RewriteRule (.*) - [L]`
- `-d` : Check if the string is an existing directory
- `-f` : Check if the string is an existing file


## HTTP Header Codes
- 301 : Moved permanently
- 302 : Moved temporary
- 403 : Forbidden
- 404 : File not found
- 500 : Internal Server Error

## Learn More
.htaccess cheatsheet [url](https://www.cheatography.com/davechild/cheat-sheets/mod-rewrite/)
or view as [pdf file](mod-rewrite-cheatsheet.pdf)
