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



# Another snippet
```
(module web-portal)
  (set [wp-js,wp-css] = /web-portal/public/[js,css]/
(html utf-8 lang=en)
  (title)
    Login Portal
  (styles 
    href [
      $(wp-css)
        styles
        form
        login
    ]
  )
  (script
    src [
      $(wp-js)
        main
        form-helper
        validation
        recover-pw
    ]
  )
```

## The `(set ...)` syntax
- It is indented underneath our `module` definition
  - This means that the instruction `set` is to be applied to the `web-portal` module
- Explaning the syntax:
  - `set [wp-js,wp-css] = [...]`
    - works just like array destructuring in javascript
    - ` = /web-portal/public/[js,css]/` returns two directory paths within an array:
      ```json
        [
          "/web-portal/public/js/",
          "/web-portal/public/css/"
        ]
      ```
  - Therefore, `wp-js` now holds `"/web-portal/public/js/"`
  - ... and `wp-css` now holds `"/web-portal/public/css/"`

## The `styles` mechanism
```
  (styles 
    href [
      $(wp-css)
        styles
        form
        login
    ]
  )
```
- The `styles` instruction is the equivalent of:
```html
<link rel="stylesheet" href="/vendor/css/bootstrap.css"/>
```
- In fact, if all we wanted to do was import `/vendor/css/bootstrap.css`:
```
  (style href /vendor/css/bootstrap.css)
```

- But our example is different. We have an *ARRAY* of strings.
  - but why are they just strings?
- First let's understand `$(wp-css)`:
  - We captured `wp-css` in our `(set [...] ...)` command
  - Now, `$(wp-css)` is a directory and every string below it under it's child indentation is a css file
```
  href [
    $(wp-css)
      styles
      form
      login
  ]
```
- We *don't* have to specify the `.css` because it's *SEMANTICALLY* assumed
- This will generate the following html:
```html
<link rel="stylesheet" href="/web-portal/public/css/styles.css"/>
<link rel="stylesheet" href="/web-portal/public/css/form.css"/>
<link rel="stylesheet" href="/web-portal/public/css/login.css"/>
```

... *CONCISE*.. *SEMANTIC*... *MARKUP*...

## `(script)` instruction
```
  (script
    src [
      $(wp-js)
        main
        form-helper
        validation
        recover-pw
    ]
```
- `script` is exactly like `styles` except it generates `<script>` tags
- The above snippet will generate:
```html
<script src="/web-portal/public/js/main.js" type="text/javascript"></script>
<script src="/web-portal/public/js/form-helper.js" type="text/javascript"></script>
<script src="/web-portal/public/js/validation.js" type="text/javascript"></script>
<script src="/web-portal/public/js/recover-pw.js" type="text/javascript"></script>
```
- We *don't* have to specify the `.js` because it's *SEMANTICALLY* assumed
