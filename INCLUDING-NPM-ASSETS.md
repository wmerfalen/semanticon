# Consider the following snippet

```
(module web-portal)
(html utf-8 lang=en)
  (title)
    Login Portal | ${title_suffix()}
  (import @acme/ladders/dist/
    js [
      :async :defer
        stacks.min.js
        smart-button.js
        autoload-img.js
    ]
    css [
      stacks-base.css
      button.css
      image.css
    ]
  )
```

## 1) Load the `web-portal` module
## 2) Define document
- As `html`
- Using the `utf-8` encoding
- The page language is `en`glish
- The generated HTML will be:
```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">

```

## The `<head>` tag is automatically placed
- In an HTML document, the first thing that should appear after the opening `<html>` tag is the `<head>` section.
- The first instruction that is one of:
  - `import`
  - `include`
  - `title`
  - `styles`
  - `script`
... will cause the opening `<head>` tag to be placed.
This echoes a *very important* design philosophy:
  *We are following the MOST COMMON patterns of html document structure.
  We are not interested in including in the language the start and end `<head>` tag because _that is a given_*

## 3) The `title` is defined
- Indentation tells us that the line after `(title)` is *content* that should be wrapped *within* the `(title)`. Again, we are not interested in having a closing tag when indentation perfectly 
### 3a) A string with a function call
```
  (title)
    Login Portal | ${title_suffix()}
```
- `Login Portal | ` is a static string
- ... but `${title_suffix()}` is a function which will be expanded during render.
