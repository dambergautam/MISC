# MySQL

## Foreign-Key

**Create table with relationship**

```
CREATE TABLE categories(
   cat_id int not null auto_increment primary key,
   cat_name varchar(255) not null,
   cat_description text
) ENGINE=InnoDB;

CREATE TABLE products(
   prd_id int not null auto_increment primary key,
   prd_name varchar(355) not null,
   prd_price decimal,
   cat_id int not null,
   FOREIGN KEY fk_cat(cat_id)
   REFERENCES categories(cat_id)
   ON UPDATE CASCADE
   ON DELETE RESTRICT
)ENGINE=InnoDB;
```

**Add foreign key**

```
ALTER TABLE `fs_templates`

ADD FOREIGN KEY fk_default_temp_id(template_id) REFERENCES fs_templates_default(template_id)
ON DELETE NO ACTION ON UPDATE CASCADE,

ADD FOREIGN KEY fk_org_id(org_id) REFERENCES fs_organization(id)
ON DELETE NO ACTION ON UPDATE CASCADE;

```

### Understanding Cascading

**ON DELETE CASCADE**

```
No child rows are allowed if its parent row doesn't exist.

When a Parent row is deleted, child rows also get deleted in foreign key's table.
All children of the parent row are deleted, too. If any of these children has
grandchildren (in another table through another foreign key) and there is ON
DELETE CASCADE defined, these should be killed, too
 (and all descendants, as long as there is a cascade effect defined.)
```

**ON DELETE RESTRICT**

```
If child rows exists, you can't delete its parent row. So, it prevent user from
deleting parent row that have one or more child in child table.
```
