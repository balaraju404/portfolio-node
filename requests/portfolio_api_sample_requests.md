# Portfolio API Sample Requests

Base URL:

    https://api.example.com/v1/portfolio

------------------------------------------------------------------------

## 1. Create Portfolio

### POST

    /portfolio/create

### Request Body

``` json
{
  "user_id": "65f2a8c6e4d123456789abcd",
  "portfolio_name": "John Developer Portfolio",

  "profile": {
    "name": "John Doe",
    "headline": "Full Stack Developer",
    "avatar": "https://cdn.example.com/profile.jpg",
    "about": "I build scalable web applications."
  },

  "sections": [
    {
      "id": "hero",
      "type": "hero",
      "order": 1,
      "visible": true,
      "data": {
        "title": "Hi, I'm John",
        "subtitle": "Full Stack Developer"
      }
    },
    {
      "id": "projects",
      "type": "projects",
      "order": 2,
      "visible": true,
      "data": {
        "items": [
          {
            "title": "Portfolio Builder",
            "description": "Custom portfolio application",
            "technologies": [
              "React",
              "Node.js",
              "MongoDB"
            ]
          }
        ]
      }
    }
  ],

  "theme": {
    "template": "modern",
    "font": "Inter"
  },

  "seo": {
    "title": "John Developer Portfolio",
    "description": "Developer portfolio website"
  }
}
```

------------------------------------------------------------------------

## 2. Update Portfolio

### POST

    /portfolio/update

### Request Body

``` json
{
  "portfolio_id": "66123456789abcdef",

  "theme": {
    "template": "minimal",
    "font": "Roboto"
  },

  "sections": [
    {
      "id": "experience",
      "type": "experience",
      "order": 3,
      "visible": true,
      "data": {
        "items": [
          {
            "company": "ABC Technologies",
            "role": "Software Engineer",
            "duration": "2023-2025"
          }
        ]
      }
    }
  ]
}
```

------------------------------------------------------------------------

## 3. List Portfolios

### POST

    /portfolio/list

### Request Body

``` json
{
  "user_id": "65f2a8c6e4d123456789abcd",
  "page": 1,
  "limit": 10
}
```

------------------------------------------------------------------------

## 4. Portfolio Details

### GET

    /portfolio/details/{portfolio_id}

Example:

    /portfolio/details/66123456789abcdef

------------------------------------------------------------------------

## 5. Public Portfolio

### GET

    /portfolio/public/{slug}

Example:

    /portfolio/public/john-developer-portfolio

------------------------------------------------------------------------

## 6. Publish Portfolio

### POST

    /portfolio/publish

### Request Body

``` json
{
  "portfolio_id": "66123456789abcdef",
  "published": true
}
```

------------------------------------------------------------------------

## 7. Make Portfolio Private

### POST

    /portfolio/update

### Request Body

``` json
{
  "portfolio_id": "66123456789abcdef",
  "is_private": true
}
```

------------------------------------------------------------------------

## 8. Delete Portfolio

### DELETE

    /portfolio/remove/{portfolio_id}

Example:

    /portfolio/remove/66123456789abcdef

------------------------------------------------------------------------

## Supported Section Types

    hero
    about
    skills
    experience
    education
    projects
    services
    testimonials
    certifications
    gallery
    contact
    custom

------------------------------------------------------------------------

## Portfolio Builder Flow

    Create Portfolio
            |
            |
    Choose Template
            |
            |
    Add Sections
            |
            |
    Customize Theme
            |
            |
    Preview
            |
            |
    Publish
